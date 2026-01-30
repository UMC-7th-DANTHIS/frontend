import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import MyLikeClass from './components/myclass/MyLikeClass';
import MyLikeDancer from './components/mydancer/MyLikeDancer';
import MyChatList from './components/chatlist/MyChatList';
import MyRegisterClass from './components/registerclass/MyRegisterClass';
import MyReview from './components/review/MyReview';
import MyComments from './components/comment/MyComments';
import MyEditProfile from './components/editprofile/MyEditProfile';
import MyInfo from './components/info/MyInfo';
import MypageSidebar from './MypageSidebar';
import MyNewClass from './components/newclass/MyNewClass';
import MyNewDancer from './components/newdancer/MyNewDancer';
import NoDancer from './components/NoDancer';
import LoadingSpinner from '../../components/LoadingSpinner';

const MypageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMenu =
    new URLSearchParams(location.search).get('menu') || 'myclasses';

  // 댄서 여부 확인
  const { data: isDancer } = useQuery({
    queryKey: ['isDancer'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/dancer-admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data.data;
    },
    enabled: selectedMenu === 'myregisteredclasses'
  });

  const { data: dancerData, isLoading: isLoadingDancerData } = useQuery({
    queryKey: ['myDancer'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/dancers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    },
    enabled: selectedMenu === 'myregisteredclasses' && isDancer === true
  });

  const getMenuContent = (): React.ReactNode => {
    switch (selectedMenu) {
      case 'myclasses':
        return <MyLikeClass />;
      case 'mydancers':
        return <MyLikeDancer />;
      case 'chatlist':
        return <MyChatList />;
      case 'myregisteredclasses':
        if (isLoadingDancerData) {
          return <LoadingSpinner isLoading={true} />;
        }
        if (!isDancer || !dancerData || !dancerData.id) {
          return <NoDancer />;
        }
        return <MyRegisterClass dancerId={dancerData.id} />;
      case 'registerdancer':
        return <MyNewDancer />;
      case 'registerclass':
        return <MyNewClass />;
      case 'myreview':
        return <MyReview />;
      case 'mycomments':
        return <MyComments />;
      case 'editprofile':
        return <MyEditProfile />;
      case 'myinfo':
        return <MyInfo />;
      default:
        return <MyLikeClass />;
    }
  };

  const renderContent = () => getMenuContent();

  const handleMenuClick = (menuKey: string) => {
    navigate(`/mypage?menu=${menuKey}`);
  };

  return (
    <MainContainer>
      <MypageSidebar
        selectedMenu={selectedMenu}
        onMenuClick={handleMenuClick}
      />
      <ContentContainer>{renderContent()}</ContentContainer>
    </MainContainer>
  );
};

export default MypageLayout;

const MainContainer = styled.div`
  background-color: black;
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 880px;
  background-color: black;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
