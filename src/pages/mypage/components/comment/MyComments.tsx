import { useState } from 'react';
import styled from 'styled-components';
import ReviewPage from './ReviewPage';
import CommentPost from './CommentPost';
import useIsMobile from '../../../../hooks/useIsMobile';

const MyComments = () => {
  const [activeTab, setActiveTab] = useState<'게시글' | '댓글' | '리뷰'>('게시글');
  const isMobile = useIsMobile();

  const renderContents = () => {
    if (activeTab === '게시글')
      return <CommentPost perPage={isMobile ? 2 : 5} />;
    if (activeTab === '댓글')
      return <CommentPost perPage={isMobile ? 2 : 5} />;
    if (activeTab === '리뷰')
      return <ReviewPage perPage={isMobile ? 2 : 5} />;

  };

  return (
    <AllContainer>
      <Container>
        <TabsRow>
          <TabButton
            type="button"
            isActive={activeTab === '게시글'}
            onClick={() => setActiveTab('게시글')}
          >
            게시글
          </TabButton>
          <TabButton
            type="button"
            isActive={activeTab === '댓글'}
            onClick={() => setActiveTab('댓글')}
          >
            댓글
          </TabButton>
          <TabButton
            type="button"
            isActive={activeTab === '리뷰'}
            onClick={() => setActiveTab('리뷰')}
          >
            리뷰
          </TabButton>
        </TabsRow>

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
  width: 100%;
  margin-right: 100px;

  @media (max-width: 600px) {
    justify-content: flex-start;
    margin-right: 0;
    width: 100%;
    padding: 0 16px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1005px;

  @media (max-width: 600px) {
    max-width: none;
  }
`;

const TabsRow = styled.div`
  display: flex;
  gap: 45px;
  padding-left: 29px;

  align-items: flex-end;

  @media (max-width: 600px) {
    gap: 32px;
    padding-left: 10px;
    margin-top: 37px;

    align-items: flex-end;
    justify-content: flex-start;
  }
`;

type TabProps = { isActive: boolean };

const TabButton = styled.button<TabProps>`
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  font-family: inherit;
  cursor: pointer;

  height: 34px;
  display: inline-flex;
  align-items: flex-end;

  color: ${(p) => (p.isActive ? '#FFFFFF' : '#4D4D4D')};
  font-size: ${(p) => (p.isActive ? '22px' : '18px')};
  font-weight: ${(p) => (p.isActive ? 600 : 500)};
  line-height: 1;

  @media (max-width: 600px) {
    height: 32px;
    font-size: ${(p) => (p.isActive ? '20px' : '16px')};
    padding: 0;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 100%;
  flex-shrink: 0;
  border: 1px solid #ddd;
  background-color: #ddd;
  margin-top: 13px;
  margin-bottom: 34px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    margin: 18px 0 22px;
  }
`;
