import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import styled from 'styled-components';
import { Context } from '../../../../Store';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.div`
  font-size: 16px;
  color: #ffffff;
`;

const RemixSwitch = ({ postMessage }) => {
  const [state, dispatch] = useContext(Context);

  const setRemixing = () => {
    dispatch({ type: 'SET_IS_REMIXING', payload: !state.isRemixing });
  };

  useEffect(() => {
    postMessage({
      event: 'KojiPreview.IsRemixing',
      isRemixing: state.isRemixing,
      editorAttributes: {},
    });
  }, [state.isRemixing]);

  return (
    <Wrapper>
      <Label>{'Remix Mode'}</Label>
      <Switch checked={state.isRemixing} onChange={setRemixing} />
    </Wrapper>
  )
};

RemixSwitch.propTypes = {
  postMessage: PropTypes.func,
};

RemixSwitch.defaultProps = {
  postMessage() {},
};

export default RemixSwitch;
