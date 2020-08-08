import React, { useContext } from 'react';
import { chromeDark, ObjectInspector } from 'react-inspector';
import styled from 'styled-components';

import { Context } from '../../../../Store';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

console.log('c', chromeDark);

const Inspector = () => {
  const [state, dispatch] = useContext(Context);

  const keys = state.vccValues['@@editor'].map(({ key }) => key);
  const tree = {};
  keys.forEach((key) => {
    tree[key] = { ...state.vccValues[key] };
  });

  return (
    <Wrapper>
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
