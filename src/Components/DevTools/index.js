import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 100%;
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
        const editor = state.vccValues['@@editor'];
        const fileContainingPath = state.vccValues[path[0]]['@@PATH'];
        console.log('f', fileContainingPath);



        // const { type } = field;

        //   if (['image'].includes(type)) {
        //     dispatch({
        //       type: 'SET_ACTIVE_PICKER',
        //       payload: 'image',
        //     });
        //     dispatch({
        //       type: 'SET_ACTIVE_VCC_PATH',
        //       payload: path,
        //     });
        //   }

        // const type = immutable.get(
        //   state.vccValues['@@editor'],
        //   path.join('.'),
        // );

        // console.log('type', type);
      }

      return setLogs(oldLogs => [...oldLogs, data]);
    };

    window.addEventListener('message', receiveMessage, false);

    return () => window.removeEventListener('message', receiveMessage);
  }, [state.vccValues]);

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
  }, []);

  return (
    <Tools>
      <Panel>
        <Controls />
      </Panel>
      <PlayerWrapper>
        <Overlay />
        <Player
          crossOrigin={'anonymous'}
          height={700}
          ref={iFrameRef}
          src={state.appURL}
          width={700}
        />
      </PlayerWrapper>
      <Panel>
        <Logs logs={logs} />
        <Picker />
      </Panel>
    </Tools>
  );
};

export default DevTools;
