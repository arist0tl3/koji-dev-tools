import React, { useContext } from 'react';
import styled from 'styled-components';

import Header from '../../Common/Header';
import CloseIcon from '../../../SVGS/Close';

import { Context } from '../../../Store';

const ImageVCCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: ${({ style: { isActive } }) => isActive ? '0' : '-100%'};
  transition: bottom 0.3s ease-in-out;
`;

const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Image = styled.div`
  width: 24%;
  cursor: pointer;

  img {
    max-width: 100%;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;

  svg {
    height: 24px;
    width: 24px;
    fill: #ffffff;
  }
`;

const ImageVCC = () => {
  const [state, dispatch] = useContext(Context);

  const sources = [
    'https://picsum.photos/id/1019/1600/1600',
    'https://picsum.photos/id/1062/1600/1600',
    'https://picsum.photos/id/1072/1600/1600'
  ];

  if (state.activeVCCValue) sources.unshift(state.activeVCCValue);

  const handleImageClick = (src) => {
    state.postMessage({
      event: 'KojiPreview.DidChangeVcc',
      path: state.activeVCCPath,
      newValue: src,
    });

    // Also update our local store so we can inspect =)
    dispatch({
      type: 'UPDATE_VCC_VALUE',
      payload: {
        newValue: src,
        path: state.activeVCCPath,
      },
    });
  };

  const handleVCCClose = () => {
    dispatch({
      type: 'RESET_VCC',
    });
  };

  return (
    <ImageVCCWrapper style={{ isActive: state.activeVCCType === 'image' }}>
      <Header>{`Name: ${state.activeVCCName || ''}`}</Header>
      <Header>{`Type: ${state.activeVCCType || ''}`}</Header>
      <CloseButton onClick={handleVCCClose}>
        <CloseIcon />
      </CloseButton>
      <ImagesWrapper>
        {
          sources.map((src) => (
            <Image key={src} onClick={() => handleImageClick(src)}>
              <img alt={'placeholder'} src={src} />
            </Image>
          ))
        }
      </ImagesWrapper>
    </ImageVCCWrapper>
  );
};

export default ImageVCC;
