import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Profile from '../../common/DancerProfile/Profile';
import IntroduceTab from '../../common/DancerProfile/IntroduceTab';
import ClassTab from '../../common/DancerProfile/ClassTab';
import api from '../../api/api';
import axiosInstance from '../../api/axios-instance';

import { DancerType, DanceClassType } from '@/types/DancerProfile/useDancer';

const DancerProfile = () => {
  const [activeTab, setActiveTab] = useState<'소개' | '등록된 수업'>('소개');
  const { dancerId } = useParams<{dancerId: string}>();
  const [dancerData, setDancerData] = useState<DancerType | null>(null);
  //const data = dummyClass.find((cls) => cls.id === Number(classId));

  useEffect(() => {
    // API 호출
    const fetchDancerData = async () => {
      try {
        const response = await axiosInstance.get(`/dancers/info/${dancerId}`);
        if (response.data.code === 200) {
          setDancerData(response.data.data);
          console.log(response.data.data);
        } else {
          console.error(
            '댄서 정보를 가져오는데 실패했습니다:',
            response.data.message
          );
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    };

    fetchDancerData();
  }, [dancerId]);

  return (
    <Layout>
      <Profile dancer={dancerData} />
      <TabContainer>
        <Tab active={activeTab === '소개'} onClick={() => setActiveTab('소개')}>
          소개
        </Tab>
        <Tab
          active={activeTab === '등록된 수업'}
          onClick={() => setActiveTab('등록된 수업')}
        >
          등록된 수업
        </Tab>
        <Indicator active={activeTab} />
      </TabContainer>
      <ContentContainer>
        {activeTab === '소개' && <IntroduceTab dancer={dancerData} />}
        {activeTab === '등록된 수업' && dancerId && (
        <ClassTab dancerId={dancerId} />
        )}

      </ContentContainer>
    </Layout>
  );
};

export default DancerProfile;

const Layout = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.media.tablet} {
    width: 1440px;
  }
`;

const TabContainer = styled.div`
  //width: 343px;
  width: 100vw;
  height: 38px;
  flex-shrink: 0;
  background: #191919;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  position: relative;
  ${({ theme }) => theme.media.tablet} {
    width: 1080px;
    height: 58px;
  }
`;

const Tab = styled.div<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 30px;
  flex-shrink: 0;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; 
  letter-spacing: -0.7px;
  cursor: pointer;
  //background-color: ${(props) => (props.active ? 'black' : '#9819C3')};
  border-bottom: ${(props) => (props.active ? 'black' : '#9819C3')};
  //transition: all 0.3s;
  ${({ theme }) => theme.media.tablet} {
    width: 523px;
    height: 50px;
    font-size: 20px;
    letter-spacing: -0.9px;
  }
`;

const Indicator = styled.div<{ active: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 3px;
  background: #9819c3;
  transition: transform 0.3s ease;
  transform: translateX(${props =>
    props.active === '소개' ? '0%' : '100%'});
`;

const ContentContainer = styled.div`
  display: flex;
  //width: 375px;
  align-items: center;
  justify-content: center;
  `;
