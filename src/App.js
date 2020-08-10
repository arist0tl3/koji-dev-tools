import React from 'react';
import styled from 'styled-components';

import Router from './Components/Router';

import Store from './Store'

import './App.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => (
  <Store>
    <Container>
      <Router />
    </Container>
  </Store>
);

export default App;
