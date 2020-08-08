import React, { useContext } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { Context } from '../../../../Store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #ffffff;
`;

const StyledInput = styled(Input)`
  background: none;
  border: none;
  color: white;
`;

const AppMetadata = () => {
  const [state, dispatch] = useContext(Context);

  const setTags = (e) => {
    const { value } = e.target;
    dispatch({
      type: 'SET_TAGS',
      payload: value,
    });
  };

  const setProfileImage = (e) => {
    const { value } = e.target;
    dispatch({
      type: 'SET_PROFILE_IMAGE',
      payload: value,
    });
  };

  const setUsername = (e) => {
    const { value } = e.target;
    dispatch({
      type: 'SET_USERNAME',
      payload: value,
    });
  };

  return (
    <Container>
      <InputWrapper>
        <Label>{'Profile URL'}</Label>
        <StyledInput onChange={setProfileImage} value={state.profileImage} />
      </InputWrapper>
      <InputWrapper>
        <Label>{'Username'}</Label>
        <StyledInput onChange={setUsername} value={state.username} />
      </InputWrapper>
      <InputWrapper>
        <Label>{'Tags'}</Label>
        <StyledInput onChange={setTags} value={state.tags} />
      </InputWrapper>
    </Container>
  )
};

export default AppMetadata;
