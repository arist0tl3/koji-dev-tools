import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../../Store';

import BooleanVCC from './Boolean';
import CustomVCC from './Custom';
import ImageVCC from './Image';
import TextVCC from './Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 50%;
  width: 100%;
  overflow: hidden;
`;

const VCCRouter = () => {
  const [state] = useContext(Context);

  if (!state.isRemixing) return (
    <Container />
  );

  return (
    <Container>
      {state.activeVCCType === 'boolean' && <BooleanVCC />}
      {state.activeVCCType && state.activeVCCType.includes('http') && <CustomVCC />}
      {state.activeVCCType === 'image' && <ImageVCC />}
      {state.activeVCCType === 'text' && <TextVCC />}
    </Container>
  );
};

export default VCCRouter;
