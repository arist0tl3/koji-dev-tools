import React, { useContext } from 'react';
import styled from 'styled-components';

import RightArrowIcon from '../../../SVGS/RightArrow';
import EyeIcon from '../../../SVGS/Eye';
import KojiLogo from '../../../SVGS/KojiLogo';
import LikeIcon from '../../../SVGS/Like';
import RemixIcon from '../../../SVGS/Remix';
import ShareIcon from '../../../SVGS/Share';

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

const ActionOverlay = styled.div`
  z-index: 5;
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  transform: translateZ(0px);
`;

const LikeAction = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  width: 38px;
  min-width: 38px;
  max-width: 38px;
  height: 38px;
  min-height: 38px;
  max-height: 38px;
  position: relative;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgb(45, 47, 48);
  padding: 8px;
  border-radius: 50%;

  svg {
    width: 24px;
    height: 24px;
    fill: #ffffff;
  }
`;

const ShareAction = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  width: 38px;
  min-width: 38px;
  max-width: 38px;
  height: 38px;
  min-height: 38px;
  max-height: 38px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgb(45, 47, 48);
  padding: 7px;
  border-radius: 50%;

  svg {
    width: 24px;
    height: 24px;
    transform: scaleX(-1);
    fill: #ffffff;
  }
`;

const RemixAction = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0px;
`;

const RemixActionIcon = styled.div`
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgb(0, 122, 255);
  will-change: transform;
  padding: 8px;
  border-radius: 50%;
  // animation: 1.4s ease 0s infinite normal none running dxxvgs;

  svg {
    width: 26px;
    height: 26px;
  }
`;

const ActionLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
  text-shadow: rgba(0, 0, 0, 0.8) 0px 0px 4px;
`;

const ActionStrip = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

const ModeAction = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
`;

const ModeActionIcon = styled.div`
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgb(45, 47, 48);
  padding: 8px;
  border-radius: 50%;

  svg {
    fill: #ffffff;
    width: 22px;
    height: 22px;
    filter: drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 6px);
  }
`;

const SaveAction = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  line-height: 1;
  color: rgba(255, 255, 255, 0.9);
`;

const SaveActionIcon = styled.div`
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  background-color: rgb(0, 122, 255);
  padding: 8px;
  border-radius: 50%;

  svg {
    fill: #ffffff;
    width: 32px;
    height: 32px;
    filter: drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 6px);
  }
`;

const Overlay = () => {
  const [state] = useContext(Context);

  if (state.isRemixing) {
    return (
      <Container>
        <ActionStrip>
          <ModeAction>
            <ModeActionIcon>
              <EyeIcon />
            </ModeActionIcon>
          </ModeAction>
          <SaveAction>
            <SaveActionIcon>
              <RightArrowIcon />
            </SaveActionIcon>
          </SaveAction>
        </ActionStrip>
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
      <ActionOverlay>
        <LikeAction>
          <LikeIcon />
        </LikeAction>
        <ShareAction>
          <ShareIcon />
        </ShareAction>
        <RemixAction>
          <RemixActionIcon>
            <RemixIcon />
          </RemixActionIcon>
          <ActionLabel>
            <span>{'Remix'}</span>
          </ActionLabel>
        </RemixAction>
      </ActionOverlay>
    </Container>
  );
};

export default Overlay;
