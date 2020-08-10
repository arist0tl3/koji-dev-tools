import React, { useContext } from 'react';
import { chromeDark, ObjectInspector } from 'react-inspector';
import styled from 'styled-components';

import Header from '../../../Common/Header';

import { Context } from '../../../../Store';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

console.log('c', chromeDark);

const Inspector = () => {
  const [state, dispatch] = useContext(Context);

  if (!state.vccValues['@@editor']) return null;

  const keys = state.vccValues['@@editor'].map(({ key }) => key);
  const tree = {};
  keys.forEach((key) => {
    tree[key] = { ...state.vccValues[key] };
  });

  return (
    <Wrapper>
      <Header>{'VCC Value Explorer'}</Header>
      <ObjectInspector
        data={tree}
        theme={{
          ...chromeDark,
          ARROW_FONT_SIZE: '14px',
          BASE_BACKGROUND_COLOR: 'none',
          BASE_FONT_SIZE: '14px',
          BASE_LINE_HEIGHT: '1.4',
          TREENODE_FONT_SIZE: '14px',
          TREENODE_LINE_HEIGHT: '1.4',
        }}
      />
    </Wrapper>
  );
};

export default Inspector;
