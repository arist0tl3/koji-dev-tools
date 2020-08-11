import React from 'react';
import styled from 'styled-components';

import ImageVCC from './ImageVCC';
import TextVCC from './TextVCC';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 50%;
  width: 100%;
  overflow: hidden;;
`;

const VCCRouter = () => (
  <Container>
    <ImageVCC />
    <TextVCC />
  </Container>
);

export default VCCRouter;
