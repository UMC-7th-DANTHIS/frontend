import styled from 'styled-components';
import { CommentsProps } from '@/types/mypage/CommentPostType';
import { ReactComponent as ArrowRight } from '../../../../assets/arrowright.svg';
import { useNavigate } from 'react-router-dom';

const CommentsReview = ({ comment }: CommentsProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    return dateString.split('T')[0].replace(/-/g, '.');
  };

  return (
    <Container>
      <CommentsWrapper
        key={comment.commentId}
      >
          <Data>
            <Title>{comment.content}</Title>
            <DateSaw>
              <Date>{formatDate(comment.createAt)}</Date>
              <SawPost onClick={()=> navigate(`/community/${comment.postId}`)}>
                게시물 보기
                <ArrowRight width={5} height={10} />
              </SawPost>
            </DateSaw>
          </Data>
      </CommentsWrapper>
    </Container>
  );
};

export default CommentsReview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    height: auto;
    margin-bottom: 24px;
    padding: 18px 22px 18px 22px;
  }
`;


const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -1px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Date = styled.div`
  color: #b2b2b2;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const DateSaw = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 14px;
`;

const SawPost = styled.div`
  color:#ddd;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`
