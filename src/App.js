import React, { useState } from 'react';
import styled from 'styled-components';

import DevTools from './Components/DevTools';
import Welcome from './Components/Welcome';

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

const App = () => {
  const [url, setURL] = useState('https://8080-3adea148-dffe-4b3f-86ec-3748e1a3fffb.koji-staging.com/');

  return (
    <Store>
      <Container>
        {
          !url &&
          <Welcome setURL={setURL} />
        }
        {
          url &&
          <DevTools url={url} />
        }
      </Container>
    </Store>
  );
};

export default App;
