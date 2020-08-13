import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as immutable from 'object-path-immutable';
import LoadingOverlay from 'react-loading-overlay';

import isNumber from '../../utils/isNumber';

import Controls from './Controls';
import Logs from './Logs';
import Overlay from './Overlay';
import VCCRouter from './VCC';

import { Context } from '../../Store';

const Tools = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  max-width: 1440px;
  background: #000000;
  display: flex;
`;

const Panel = styled.div`
  width: calc(50% - 350px);
  height: 100vh;
  background: #111111;
  padding: 16px;
  overflow: hidden;
`;

const PlayerContainer = styled.div`
  width: 700px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerWrapper = styled.div`
  position: relative;

  ${({ style: { mode } }) => {
    if (mode === 'desktop') {
      return `
        width: 100%;
        height: 100%;
        max-width: 700px;
      `;
    }

    return `
      width: 375px;
      height: 667px;
    `;
  }}
`;

const Player = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
`;

const StyledLoader = styled(LoadingOverlay)`
  .MyLoader_overlay {
    background: rgba(0, 0, 0, 0.9);
  }
`

const supportedVCCTypes = ['text', 'textarea', 'image', 'boolean'];

const takingTooLongMessage = (
  <div>
    <div>{'This is taking a while... Make sure you have added the following snippet to your template:'}</div>
    <div>
      <pre>
        {`
          window.parent.postMessage({
            vccValues: instantRemixing.get([]),
          }, '*');
        `}
      </pre>
    </div>
  </div>
);

const DevTools = () => {
  const [state, dispatch] = useContext(Context);

  const [isTakingTooLong, setIsTakingTooLong] = useState(false);
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!state.vccValues || Object.keys(state.vccValues).length === 0) {
        setIsTakingTooLong(true);
      }
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [state.vccValues]);

  const iFrameRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const setVCC = ({ type, path, currentValue, name }) => {
    if (!state.isRemixing) return;

    dispatch({
      type: 'SET_ACTIVE_VCC_TYPE',
      payload: type,
    });
    dispatch({
      type: 'SET_ACTIVE_VCC_PATH',
      payload: path,
    });
    dispatch({
      type: 'SET_ACTIVE_VCC_NAME',
      payload: name,
    });
    dispatch({
      type: 'SET_ACTIVE_VCC_VALUE',
      payload: currentValue,
    });
  };

  useEffect(() => {
    const receiveMessage = ({ data = {} }) => {
      const {
        // attributes,
        event,
        vccValues = {},
        newValue,
        path,
        payload,
        source = '',
        _type,
      } = data;

      // Don't handle react-devtools
      if (source.includes('react-devtools')) return;

      // Handle the init value (dev needs to add custom function to template)
      if (Object.keys(vccValues).length) {
        dispatch({
          type: 'SET_VCC_VALUES',
          payload: vccValues,
        });

        // Toggle the remix mode on by default
        // Note: We can't just set the init state bc the template expects
        // a message
        // return dispatch({
        //   type: 'SET_IS_REMIXING',
        //   payload: true,
        // });
      }

      if (_type === 'KOJI_CUSTOM_VCC') {
        // Pass the value through if we have a current vcc
        if (event === 'onChange' && payload) {
          const { value } = payload;
          if (value) {
            state.postMessage({
              event: 'KojiPreview.DidChangeVcc',
              path: state.activeVCCPath,
              newValue: value,
            });

            // Also update our local store so we can inspect =)
            dispatch({
              type: 'UPDATE_VCC_VALUE',
              payload: {
                path: state.activeVCCPath,
                newValue: value,
              },
            });
          }
        }
      }

      if (_type === 'KojiPreview.SetValue' && newValue && path.length) {
        // If the template triggered a set value, we just return the value
        // as if it were written
        state.postMessage({
          event: 'KojiPreview.DidChangeVcc',
          path,
          newValue,
        });

        // Also update our local store so we can inspect =)
        dispatch({
          type: 'UPDATE_VCC_VALUE',
          payload: {
            newValue,
            path,
          },
        });
      }

      if (_type === 'KojiPreview.PresentControl' && path.length) {

        // Get the current value so we can populate the input
        const currentValue = immutable.get(state.vccValues, path.join('.'));

        // Attempt to drill down to the scope/field
        const [scopeKey, fieldKey, ...rest] = path;

        const editor = state.vccValues['@@editor'] || [];
        const scope = editor.find(({ key }) => key === scopeKey);

        if (!scope) return;

        const { fields = [] } = scope;
        const field = fields.find(({ key }) => key === fieldKey);
        if (!field) return;

        // Take the currentType and attempt to resolve nested paths
        let { name, type: currentType, typeOptions } = field;

        if (rest.length > 0) {
          rest.forEach((pathElem) => {
            // If the pathElem is a number, we assume we are looking at an array
            if (isNumber(pathElem)) {
              // Are we looking at an object?
              if (currentType.includes('<')) {
                const objectType = currentType.split('<')[1].slice(0, -3);
                if (field.typeOptions && field.typeOptions[objectType]) {
                  currentType = field.typeOptions[objectType];
                }
              } else {
                // If we are looking at an array of type, then we can just strip
                // the brackets, e.g., image[]
                currentType = currentType.splice(0, -2);
              }
            } else {
              // Continue into the object and look for a type
              if (currentType[pathElem] && currentType[pathElem].type) {
                currentType = currentType[pathElem].type;

                if (currentType[pathElem] && currentType[pathElem].typeOptions) {
                  if (currentType[pathElem].typeOptions.defaultSource) {
                    currentType = `https://${currentType[pathElem].typeOptions.defaultSource}.koji-vccs.com`;
                  }
                }
              }
            }
          });
        } else {
          // Look for defaultSource
          if (typeOptions) {
            if (typeOptions.defaultSource) {
              currentType = `https://${typeOptions.defaultSource}.koji-vccs.com`;
            }
          }
        }

        // If it is a supported VCC type, we can render it
        // otherwise, we'll just render a text input
        if (supportedVCCTypes.includes(currentType) || currentType.includes('http')) {
          setVCC({
            type: currentType,
            name,
            currentValue,
            path,
          });
        } else {
          setVCC({
            type: 'text',
            name,
            currentValue,
            path,
          });
        }
      }

      return setLogs(oldLogs => [...oldLogs, data]);
    };

    window.addEventListener('message', receiveMessage, false);

    return () => window.removeEventListener('message', receiveMessage);
  }, [dispatch, state]);

  useEffect(() => {
    dispatch({
      type: 'SET_POST_MESSAGE',
      payload: (message) => {
        if (iFrameRef && iFrameRef.current && iFrameRef.current.contentWindow) {
          iFrameRef.current.contentWindow.postMessage(message, '*');
        } else {
          console.error('Unable to communicate with iFrame');
        }
      },
    })
  }, [dispatch]);

  return (
    <StyledLoader
      active={!state.vccValues || Object.keys(state.vccValues).length === 0}
      classNamePrefix={'MyLoader_'}
      spinner
      text={isTakingTooLong ? takingTooLongMessage : null}
    >
      <Tools>
        <Panel>
          <Controls />
        </Panel>
        <PlayerContainer>
          <PlayerWrapper style={{ mode: state.deviceMode }}>
            <Overlay />
            <Player
              crossOrigin={'anonymous'}
              height={700}
              ref={iFrameRef}
              src={state.appURL}
              width={700}
            />
          </PlayerWrapper>
        </PlayerContainer>
        <Panel>
          <Logs logs={logs} />
          <VCCRouter />
        </Panel>
      </Tools>
    </StyledLoader>
  );
};

export default DevTools;
