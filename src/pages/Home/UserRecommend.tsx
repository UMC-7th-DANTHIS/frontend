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
  margin-left: 100px;
  margin-right: 100px;

  padding-bottom: 60px;
`;

const Wrapper = styled.div`
  margin-left: 105px;
  margin-right: 105px;
`;

const Border = styled.div`
  border-bottom: 2px solid #4d4d4d;

  margin-top: 87px;
  margin-bottom: 87px;
`;

const Header = styled.div`
  margin-bottom: 62px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export default UserRecommend;
