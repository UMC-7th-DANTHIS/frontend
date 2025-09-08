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
        <ForDancer dancer={dancer} />
      </Wrapper>
      <Border />
      <Wrapper>
        <Header>오로지 {user?.data.nickname}님을 위한 맞춤형 수업이에요</Header>
        <ForClass danceclass={danceclass} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 60px;
`;

const Wrapper = styled.div``;

const Border = styled.div`
  border-bottom: 2px solid #4d4d4d;

  margin-top: 87px;
  margin-bottom: 87px;
`;

const Header = styled.div`
  margin-bottom: 62px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    justify-content: start;
    align-items: start;
    font-size: 28px;
  }

  color: white;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default UserRecommend;
