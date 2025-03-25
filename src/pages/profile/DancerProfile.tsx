import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Profile from './components/Profile';
import IntroduceTab from './components/IntroduceTab';
import ClassTab from './components/ClassTab';
import api from '../../api/api';
import dummyClasses from '../../store/reservation/dummyClasses';

const DancerProfile = () => {
  const [activeTab, setActiveTab] = useState('소개');
  const { dancerId } = useParams();
  const [dancerData, setDancerData] = useState(null);
  //const data = dummyClass.find((cls) => cls.id === Number(classId));

  useEffect(() => {
    // API 호출
    const fetchDancerData = async () => {
      try {
        const response = await api.get(`/dancers/${dancerId}`);
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
      </TabContainer>
      <ContentContainer>
        {activeTab === '소개' && <IntroduceTab dancer={dancerData} />}
        {activeTab === '등록된 수업' && (
          <ClassTab classes={dancerData.classes} />
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
`;

const TabContainer = styled.div`
  width: 1240px;
  height: 86.005px;
  flex-shrink: 0;
  background: #9819c3;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  margin-left: 100px;
  justify-content: center;
  margin-right: 100px;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 620px;
  height: 86.005px;
  flex-shrink: 0;
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
  cursor: pointer;
  border-radius: 20px 20px 0px 0px;
  //border-top: 3px solid var(--main_purple, #9819c3);
  border-right: 3px solid var(--main_purple, #9819c3);
  border-left: 3px solid var(--main_purple, #9819c3);
  background: var(--main_black, #000);
  box-shadow: 0px 8px 16px 0px var(--main_purple, #9819c3) inset;
  background-color: ${(props) => (props.active ? 'black' : '#9819C3')};
  transition: all 0.3s;
`;

const ContentContainer = styled.div``;
