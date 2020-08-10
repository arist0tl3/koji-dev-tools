import React from 'react';
import styled from 'styled-components';

import ImagePicker from './ImagePicker';
import TextPicker from './TextPicker';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 50%;
  width: 100%;
  overflow: hidden;;
`;

const Picker = () => (
  <Container>
    <ImagePicker />
    <TextPicker />
  </Container>
);

export default Picker;
