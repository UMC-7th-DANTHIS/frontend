import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import ForUserBanner from '../../common/Home/ForUserBanner';
import ForDancer from '../../common/Home/ForDancer';
import ForClass from '../../common/Home/ForClass';

import { AllClassData, AllDancerData } from '@/types/MainInterface';
import { UserContext } from '@/types/Context/User';

type UserRecommendProps = {
  dancer: AllDancerData;
  danceclass: AllClassData;
};

const UserRecommend = ({ dancer, danceclass }: UserRecommendProps) => {
  const { user } = useOutletContext<UserContext>();

  return (
    <Container>
      <Wrapper>
        <ForUserBanner />
        <Header>
          {user?.data.nickname} 님의 스타일에 맞는 댄서를 소개할게요
        </Header>
        <AlignCenter>
          <ForDancer dancer={dancer} />
        </AlignCenter>
      </Wrapper>
      <Border />
      <Wrapper>
        <Header>오로지 {user?.data.nickname}님을 위한 맞춤형 수업이에요</Header>
        <AlignCenter>
          <ForClass danceclass={danceclass} />
        </AlignCenter>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding-bottom: 60px;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  max-width: 1030px;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Border = styled.div`
  border-bottom: 2px solid #4d4d4d;

  margin-top: 43px;
  x ${({ theme }) => theme.media.tablet} {
    margin-top: 87px;
  }
  margin-bottom: 87px;
`;

const Header = styled.div`
  margin-bottom: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0px 0px 62px 0px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
    font-size: 28px;

    margin: 0px 0px 62px 32px;
    min-width: max-content;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default UserRecommend;
