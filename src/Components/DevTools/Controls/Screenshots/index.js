import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import axios from 'axios';

import { Context } from '../../../../Store';

const Container = styled.div`

`;

const StyledButton = styled(Button)`
  background: #131313;
  color: #ffffff;
  border: 1px solid #ffffff;
  width: 100%;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover, &:focus {
    background: #333333;
    color: #ffffff;
    border: 1px solid #ffffff;
  }
`;

const Screenshots = () => {
  const [state] = useContext(Context);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScreenshotClick = async () => {
    setIsProcessing(true);
    const res = await axios({
      data: {
        messageLog: state.messageLog,
        url: state.appURL,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      responseType: 'blob',
      url: 'http://localhost:3001',
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'screenshot.png'); //or any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
    setIsProcessing(false);
  };

  return (
    <Container>
      <StyledButton
        loading={isProcessing}
        onClick={handleScreenshotClick}
      >
          {'Generate Screenshot (Beta)'}
      </StyledButton>
      {/*<StyledButton>{'Generate Share Card'}</StyledButton>*/}
    </Container>
  )
};

export default Screenshots;