import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '../../Common/Header';
import CloseIcon from '../../../SVGS/Close';

import { Context } from '../../../Store';

const TextPickerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: ${({ style: { isActive } }) => isActive ? '0' : '-100%'};
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

const ImagePicker = () => {
  const [state, dispatch] = useContext(Context);
  const [value, setValue] = useState(null);
  const [init, setInit] = useState(false);


  const handleVCCClose = () => {
    dispatch({
      type: 'RESET_VCC',
    });
  };

  useEffect(() => {
    if (state.activeVCCType !== 'text') return;
    
    if (!value && state.activeVCCValue && !init) {
      setValue(state.activeVCCValue);
      setInit(true);
    }

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
  }, [dispatch, init, state, value])

  return (
    <TextPickerWrapper style={{ isActive: state.activeVCCType === 'text' }}>
      <Header>{`Name: ${state.activeVCCName || ''}`}</Header>
      <Header>{`Type: ${state.activeVCCType || ''}`}</Header>
      <CloseButton onClick={handleVCCClose}>
        <CloseIcon />
      </CloseButton>
      {
        state.activeVCCType === 'text' &&
        <Input
          onChange={(e) => setValue(e.target.value)}
          type={'text'}
          value={value}
        />
      }
    </TextPickerWrapper>
  );
};

export default ImagePicker;
