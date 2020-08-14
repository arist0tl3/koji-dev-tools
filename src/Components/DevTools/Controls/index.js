import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import AppMetadata from './AppMetadata';
import DevicePicker from './DevicePicker';
import Header from '../../Common/Header';
import Inspector from './Inspector';
import RefreshLink from './RefreshLink';
import RemixSwitch from './RemixSwitch';
import Screenshots from './Screenshots';

import { Context } from '../../../Store';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const StyledDivider = styled(Divider)`
  background: #ffffff;
`

const Controls = () => {
  const [state] = useContext(Context);

  return (
    <Wrapper>
      <Header>{'Template Options'}</Header>
      <RemixSwitch />
      <DevicePicker />
      <RefreshLink />
      <StyledDivider />
      {
        !state.isRemixing &&
        <>
          <AppMetadata />
          <StyledDivider />
          <Screenshots />
        </>
      }
      {
        state.isRemixing &&
        <Inspector />
      }
    </Wrapper>
  );
};

export default Controls;
