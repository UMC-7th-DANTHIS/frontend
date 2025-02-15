import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import ForUserBanner from '../../components/Home/ForUserBanner';
import ForDancer from '../../components/Home/ForDancer';
import ForClass from '../../components/Home/ForClass';

const UserRecommend = ({ dummyUserDancer, dummyUserClass }) => {
  const { user } = useOutletContext();
  console.log(user);

  return (
    <Container>
      <ForUserBanner />
      <Header>{user?.nickname} 님의 스타일에 맞는 댄서를 소개할게요</Header>
      <ForDancer dummyUserDancer={dummyUserDancer} />
      <Header>오로지 {user?.nickname}님을 위한 맞춤형 수업이에요</Header>
      <ForClass dummyUserClass={dummyUserClass} />
    </Container>
  );
};

export default UserRecommend;

const Container = styled.div`
  margin-left: 100px;
  margin-right: 100px;

  padding-bottom: 60px;
`;

const Header = styled.div`
  margin-bottom: 62px;
  position: relative;
  z-index: 1;

  color: white;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
