import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider } from 'antd';

import AppMetadata from './AppMetadata';
import Inspector from './Inspector';
import RemixSwitch from './RemixSwitch';

import { Context } from '../../../Store';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledDivider = styled(Divider)`
  background: #ffffff;
`

const Controls = ({ postMessage }) => {
  const [state] = useContext(Context);

  return (
    <Wrapper>
      <RemixSwitch postMessage={postMessage} />
      <StyledDivider />
      {
        !state.isRemixing &&
        <AppMetadata />
      }
      {
        state.isRemixing &&
        <Inspector />
      }
    </Wrapper>
  );
};

Controls.propTypes = {
  postMessage: PropTypes.func,
};

Controls.defaultProps = {
  postMessage() { },
};

export default Controls;
