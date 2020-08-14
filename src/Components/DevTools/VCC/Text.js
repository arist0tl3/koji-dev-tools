import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '../../Common/Header';
import CloseIcon from '../../../SVGS/Close';

import { Context } from '../../../Store';

const TextVCCWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: ${({ style: { isReady } }) => isReady ? '0' : '-100%'};
  transition: bottom 0.3s ease-in-out;
`;

const Input = styled.input`
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;

  svg {
    height: 24px;
    width: 24px;
    fill: #ffffff;
  }
`;

const TextVCC = () => {
  const [state, dispatch] = useContext(Context);
  const [value, setValue] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleVCCClose = () => {
    setIsReady(false);
    window.setTimeout(() => {
      dispatch({
        type: 'RESET_VCC',
      });
    }, 300);
  };

  useEffect(() => {
    if (!value && state.activeVCCValue && !isReady) {
      setValue(state.activeVCCValue);
      window.setTimeout(() => setIsReady(true), 0);
    }
  }, [value, state.activeVCCValue, isReady]);

  useEffect(() => {
    if (!isReady) return;

    if (value !== state.activeVCCValue) {
      const message = {
        event: 'KojiPreview.DidChangeVcc',
        path: state.activeVCCPath,
        newValue: value,
      };

      state.postMessage(message);

      // Log the message
      dispatch({
        type: 'ADD_MESSAGE_LOG',
        payload: message,
      });

      // Also update our local store so we can inspect =)
      dispatch({
        type: 'UPDATE_VCC_VALUE',
        payload: {
          newValue: value,
          path: state.activeVCCPath,
        },
      });
    }
  }, [dispatch, state.activeVCCValue, value]);

  return (
    <TextVCCWrapper style={{ isReady }}>
      <Header>{`Name: ${state.activeVCCName || ''}`}</Header>
      <Header>{`Type: ${state.activeVCCType || ''}`}</Header>
      <CloseButton onClick={handleVCCClose}>
        <CloseIcon />
      </CloseButton>
      <Input
        onChange={(e) => setValue(e.target.value)}
        type={'text'}
        value={value}
      />
    </TextVCCWrapper>
  );
};

export default TextVCC;
