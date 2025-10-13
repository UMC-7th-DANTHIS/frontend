import { useState } from 'react';
import styled from 'styled-components';
import ReviewPage from './ReviewPage';
import CommentPost from './CommentPost';
import useIsMobile from '../../../../hooks/useIsMobile';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState<'게시글' | '댓글'>('게시글');
  const isMobile = useIsMobile();

  const renderContents = () => {
    if (activeTab === '게시글') {
      return <CommentPost perPage={isMobile ? 2 : 5} />;
    }
    if (activeTab === '댓글') {
      return <ReviewPage perPage={isMobile ? 2 : 5} />;
    }
  };

  return (
    <AllContainer>
      <Container>
        <TextContainer>
          <Tab
            isActive={activeTab === '게시글'}
            onClick={() => setActiveTab('게시글')}
          >
            게시글
          </Tab>
          <Tab
            isActive={activeTab === '댓글'}
            onClick={() => setActiveTab('댓글')}
          >
            댓글
          </Tab>
        </TextContainer>

        <Divider />
        {renderContents()}
      </Container>
    </AllContainer>
  );
};

export default MyComments;

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 100px;

  @media (max-width: 600px) {
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 0;
    width: 100%;
    padding: 0 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  margin-left: 29px;

  @media (max-width: 600px) {
    gap: 32px;
    margin-left: 10px;
    margin-top: 37px;
    justify-content: flex-start;
  }
`;

type TabProps = {
  isActive: boolean;
};

const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isActive ? 'white' : '#4D4D4D')};
  font-size: ${(props) => (props.isActive ? '22px' : '18px')};
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  line-height: normal;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: ${(props) => (props.isActive ? '20px' : '16px')};
  }
`;

const Divider = styled.div`
  width: 1005px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-bottom: 34px;

  @media (max-width: 600px) {
    width: 100%;
    margin: 18px 0 22px;
  }
`;
