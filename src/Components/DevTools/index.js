import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Controls from './Controls';
import Logs from './Logs';
import Overlay from './Overlay';

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

const DevTools = ({ url }) => {
  const [state, dispatch] = useContext(Context);

  const iFrameRef = useRef(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const receiveMessage = ({ data = {} }) => {
      console.log('DATA', data);
      const {
        attributes,
        vccValues = {},
        newValue,
        path,
        source = '',
        _type,
      } = data;

      // Don't handle react devtools
      if (source.includes('react-devtools')) return;

      // Handle the init value (dev needs to add custom function to template)
      if (Object.keys(vccValues).length) {
        return dispatch({
          type: 'SET_VCC_VALUES',
          payload: vccValues,
        });
      }

      if (_type === 'KojiPreview.SetValue' && newValue && path.length) {
        // If the template triggered a set value, we just return the value
        // as if it were written
        postMessage({
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

      return setLogs(oldLogs => [...oldLogs, data]);
    };

    window.addEventListener('message', receiveMessage, false);

    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  const postMessage = (message) => {
    if (iFrameRef && iFrameRef.current && iFrameRef.current.contentWindow) {
      iFrameRef.current.contentWindow.postMessage(message, '*');
    } else {
      console.error('Unable to communicate with iFrame');
    }
  };

  return (
    <Tools>
      <Panel>
        <Controls postMessage={postMessage} />
      </Panel>
      <PlayerWrapper>
        <Overlay />
        <Player
          crossOrigin={'anonymous'}
          height={700}
          ref={iFrameRef}
          src={'http://0.0.0.0:8080/'}
          width={700}
        />
      </PlayerWrapper>
      <Panel>
        <Logs logs={logs} />
      </Panel>
    </Tools>
  );
};

export default DevTools;
