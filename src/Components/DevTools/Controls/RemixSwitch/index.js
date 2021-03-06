import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import { Context } from '../../../../Store';

const Container = styled.div`
  display: flex;
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
  width: 100%;
`;

const StyledSelect = styled(Select)`
  * {
    background: #111111 !important;
    color: #ffffff !important;
    border: none !important;
    outline: none !important;
  }
`;

const RemixSwitch = () => {
  const [state, dispatch] = useContext(Context);

  const handleChange = (mode) => {
    const payload = mode === 'remix';
    dispatch({
      type: 'SET_IS_REMIXING',
      payload,
    });
  };

  // Listen for changes so we can update the template
  useEffect(() => {
    state.postMessage({
      event: 'KojiPreview.IsRemixing',
      isRemixing: state.isRemixing,
      editorAttributes: {},
    });
  }, [state]);

  return (
    <Container>
      <InputWrapper>
        <Label>{'Mode'}</Label>
        <StyledSelect
          bordered={false}
          dropdownStyle={{
            background: '#111111',
            color: '#ffffff',
          }}
          onChange={handleChange}
          value={state.isRemixing ? 'remix' :'preview'}
        >
          <Select.Option value={'preview'}>{'Preview'}</Select.Option>
          <Select.Option value={'remix'}>{'Remix'}</Select.Option>
        </StyledSelect>
      </InputWrapper>
    </Container>

  )
};

export default RemixSwitch;
