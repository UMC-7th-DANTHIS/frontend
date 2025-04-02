import { useState } from 'react';
import styled from 'styled-components';
import ReviewPage from './ReviewPage';
import CommentPost from './CommentPost';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState<'게시글' | '리뷰'>('게시글');

  const renderContents = () => {
    if (activeTab === '게시글') {
      return <CommentPost />;
    }
    if (activeTab === '리뷰') {
      return <ReviewPage />;
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
            isActive={activeTab === '리뷰'}
            onClick={() => setActiveTab('리뷰')}
          >
            리뷰
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  margin-left: 29px;
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
`;

const Divider = styled.div`
  width: 1005px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-bottom: 34px;
`;
