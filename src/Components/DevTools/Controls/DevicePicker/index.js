import React, { useContext } from 'react';
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

const DevicePicker = () => {
  const [state, dispatch] = useContext(Context);

  const handleChange = (payload) => {
    dispatch({
      type: 'SET_DEVICE_MODE',
      payload,
    });
  };

  return (
    <Container>
      <InputWrapper>
        <Label>{'Device'}</Label>
        <StyledSelect
          bordered={false}
          defaultValue={state.deviceMode}
          dropdownStyle={{
            background: '#111111',
            color: '#ffffff',
          }}
          onChange={handleChange}
        >
          <Select.Option value={'desktop'}>{'Desktop'}</Select.Option>
          <Select.Option value={'iPhone6'}>{'iPhone 6'}</Select.Option>
        </StyledSelect>
      </InputWrapper>
    </Container>

  )
};

export default DevicePicker;
