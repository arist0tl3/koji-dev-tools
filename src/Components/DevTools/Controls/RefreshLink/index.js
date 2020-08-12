import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../../../Store';

const TextLink = styled.span`
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  min-height: 32px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const RefreshLink = () => {
  const [state, dispatch] = useContext(Context);

  const handleClick = () => {
    const { appURL } = state;

    dispatch({
      type: 'SET_APP_URL',
      payload: null,
    });

    dispatch({
      type: 'SET_APP_IS_REFRESHING',
      payload: true,
    });

    window.setTimeout(() => {
      dispatch({
        type: 'SET_APP_URL',
        payload: appURL,
      });

      dispatch({
        type: 'SET_APP_IS_REFRESHING',
        payload: false,
      });
    }, 0);
  };

  return (
    <TextLink onClick={handleClick}>
      {'Refresh'}
    </TextLink>
  );
};

export default RefreshLink;
