import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '../../Common/Header';
import CloseIcon from '../../../SVGS/Close';

import { Context } from '../../../Store';

const CustomVCCWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: ${({ style: { isReady } }) => isReady ? '0' : '-100%'};
  transition: bottom 0.3s ease-in-out;
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

const Player = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
`;

const CustomVCC = () => {
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
      state.postMessage({
        event: 'KojiPreview.DidChangeVcc',
        path: state.activeVCCPath,
        newValue: value,
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
    <CustomVCCWrapper style={{ isReady }}>
      <Header>{`Name: ${state.activeVCCName || ''}`}</Header>
      <Header>{`Type: ${state.activeVCCType || ''}`}</Header>
      <CloseButton onClick={handleVCCClose}>
        <CloseIcon />
      </CloseButton>
      {
        (state.activeVCCType && state.activeVCCType.includes('http') && value) &&
        <Player
          crossOrigin={'anonymous'}
          height={700}
          src={state.activeVCCType}
          width={700}
        />
      }
    </CustomVCCWrapper>
  );
};

export default CustomVCC;
