import React, { useContext } from 'react';
import styled from 'styled-components';
import KojiLogo from '../../../SVGS/KojiLogo';
import { Context } from '../../../Store';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

const KojiLogoWrapper = styled.div`
  position: absolute;
  top: 16px;
  z-index: 99;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transform: translateZ(0px);
  left: 16px;

  svg {
    height: 30px;
    width: auto;
    filter: drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 6px);
  }
`;

const MetadataOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 10px;
  z-index: 5;
  width: 100%;
  max-width: calc(100% - 84px);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transform: translateZ(0px);
`;

const ProfilePicture = styled.div`
  margin-right: 6px;
`;

const RoundContainer = styled.div`
  cursor: pointer;
  user-select: none;
  width: 42px;
  height: 42px;
  min-width: 42px;
  min-height: 42px;
  max-width: 42px;
  max-height: 42px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  margin: 0px 2px;
  border-radius: 4px;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  background-image: url('${({ style: { src } }) => src}');
  background-size: cover;
  border-radius: 4px;
`;

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 14px;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 0px 4px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.25;
`;

const Caption = styled.div`
  margin-top: 4px;
  max-height: 19px;
  width: 100%;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
`;

const Tag = styled.div`
  font-size: 11px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.4);
  margin-right: 3px;
  padding: 4px 8px;
  border-radius: 4px;
`;

const Overlay = () => {
  const [state] = useContext(Context);

  if (state.isRemixing) {
    return (
      <Container>

      </Container>
    );
  }

  return (
    <Container>
      <KojiLogoWrapper>
        <KojiLogo />
      </KojiLogoWrapper>
      <MetadataOverlay>
        <ProfilePicture>
          <RoundContainer>
            <ProfileImage style={{ src: state.profileImage }} />
          </RoundContainer>
        </ProfilePicture>
        <Details>
          <Username>{state.username}</Username>
          <Caption>
            {
              state.tags.split(',').map(tag => tag.trim()).map((tag, idx) => (
                <Tag key={idx}>{`#${tag}`}</Tag>
              ))
            }
          </Caption>
        </Details>
      </MetadataOverlay>
    </Container>
  );
};

export default Overlay;
