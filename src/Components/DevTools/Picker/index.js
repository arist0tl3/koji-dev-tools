import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../../Store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 50%;
  width: 100%;
  overflow: auto;
`;

const ImagePicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Image = styled.div`
  width: 45%;
  margin: 2.5%;
  cursor: pointer;

  img {
    max-width: 100%;
  }
`;

const Picker = () => {
  const [state] = useContext(Context);

  const sources = [
    'https://picsum.photos/id/101/1600/1600',
    'https://picsum.photos/id/1019/1600/1600',
    'https://picsum.photos/id/1062/1600/1600',
    'https://picsum.photos/id/1072/1600/1600'
  ];

  const handleImageClick = (src) => {
    state.postMessage({
      event: 'KojiPreview.DidChangeVcc',
      path: state.activeVCCPath,
      newValue: src,
    });
  };

  return (
    <Container>
      {
        state.activePicker === 'image' &&
        <ImagePicker>
          {
            sources.map((src) => (
              <Image key={src} onClick={() => handleImageClick(src)}>
                <img src={src} />
              </Image>
            ))
          }
        </ImagePicker>
      }
    </Container>
  );
};

export default Picker;
