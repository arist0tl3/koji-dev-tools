import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '../../SVGS/Arrow';

import { Context } from '../../Store';

const Title = styled.h1`
  font-size: min(6rem, 12vw);
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  font-size: 24px;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: #ffffff;
  margin-right: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 16px;

  svg {
    background: none;
    fill: ${({ style: { isValid } }) => isValid ? '#ffffff' : '#a1a1a1'};
  }
`;

const Welcome = () => {
  const [, dispatch] = useContext(Context);

  const [value, setValue] = useState('');

  const isValid = (url) => {
    if (!url || url === '') return false;
    // if (!url.includes('koji-staging.com')) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_APP_URL',
      payload: value,
    })
  };

  return (
    <div>
      <Title>{'koji dev tools'}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          placeholder={'enter your koji remote preview link'}
          type={'text'}
          value={value}
        />
        <Button
          disabled={!isValid(value)}
          htmlType={'submit'}
          style={{ isValid: isValid(value) }}
        >
          <ArrowIcon />
        </Button>
      </Form>
    </div>
  );
};

export default Welcome;
