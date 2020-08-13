import React from 'react';
import styled from 'styled-components';

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

const VCCRouter = () => (
  <Container>
    <BooleanVCC />
    <CustomVCC />
    <ImageVCC />
    <TextVCC />
  </Container>
);

export default VCCRouter;
