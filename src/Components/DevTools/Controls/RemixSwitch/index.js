import React, { useContext, useEffect } from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

import Header from '../../../Common/Header';

import { Context } from '../../../../Store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.div`
  font-size: 16px;
  color: #ffffff;
`;

const RemixSwitch = () => {
  const [state, dispatch] = useContext(Context);

  const setRemixing = () => {
    dispatch({ type: 'SET_IS_REMIXING', payload: !state.isRemixing });
  };

  useEffect(() => {
    state.postMessage({
      event: 'KojiPreview.IsRemixing',
      isRemixing: state.isRemixing,
      editorAttributes: {},
    });
  }, [state]);

  return (
    <Container>
      <Header>{'Template Mode'}</Header>
      <InputWrapper>
        <Label>{'Is Remixing'}</Label>
        <Switch checked={state.isRemixing} onChange={setRemixing} />
      </InputWrapper>
    </Container>

  )
};

export default RemixSwitch;
