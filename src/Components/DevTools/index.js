import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as immutable from 'object-path-immutable';

import Controls from './Controls';
import Logs from './Logs';
import Overlay from './Overlay';
import Picker from './Picker';

import { Context } from '../../Store';

const Tools = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
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

const DevTools = () => {
  const [state, dispatch] = useContext(Context);

  const iFrameRef = useRef(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const receiveMessage = ({ data = {} }) => {
      console.log('DATA', data);
      const {
        // attributes,
        vccValues = {},
        newValue,
        path,
        source = '',
        _type,
      } = data;

      // Don't handle react-devtools
      if (source.includes('react-devtools')) return;

      // Handle the init value (dev needs to add custom function to template)
      if (Object.keys(vccValues).length) {
        console.log('v', vccValues);
        dispatch({
          type: 'SET_VCC_VALUES',
          payload: vccValues,
        });

        // Toggle the remix mode on by default
        // Note: We can't just set the init state bc the template expects
        // a message
        return dispatch({
          type: 'SET_IS_REMIXING',
          payload: true,
        });
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
        console.log('s', state.vccValues);

        const currentValue = immutable.get(state.vccValues, path.join('.'));
        console.log('c', currentValue);

        const editor = state.vccValues['@@editor'] || [];
        const scope = editor.find(({ key }) => key === path[0]);

        if (!scope) return;

        const { fields = [] } = scope;
        const field = fields.find(({ key }) => key === path[1]);
        if (!field) return;

        const { name, type } = field;
        if (!type) return;

        if (type.endsWith('[]')) {
          console.log('array');
          return;
        }

        if ((type.includes('<') && type.endsWith('>'))) {
          console.log('object');
          return;
        }

        if (['image', 'textarea', 'sound', 'color', 'boolean', 'range', 'select', 'secret', 'file'].includes(type)) {
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
        } else {
          dispatch({
            type: 'SET_ACTIVE_VCC_TYPE',
            payload: 'text',
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
        <Picker />
      </Panel>
    </Tools>
  );
};

export default DevTools;
