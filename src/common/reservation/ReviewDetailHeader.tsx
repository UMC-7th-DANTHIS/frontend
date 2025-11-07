import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as EditIcon } from '../../assets/shape/write.svg';
import { ReactComponent as DeleteIcon } from '../../assets/shape/trash.svg';
import { ReactComponent as Siren } from '../../assets/Community/SirenButton.svg';
import formatDate from '../../api/formatDate';
import useIsMobile from '../../hooks/useIsMobile';
import useDeleteReview from '../../hooks/reservation/review/useDeleteReview';
import { ModalTwoBtns } from '../../components/modals';

interface PostHeaderProps {
  title: string;
  author: string;
  reviewId: number;
  isAuthor: boolean;
  createdAt: string;
  classId: string;
  page: number; // 리뷰 탭에서 해당 리뷰가 위치하던 페이지 정보
}

export const ReviewDetailHeader = ({
  title,
  author,
  reviewId,
  isAuthor,
  createdAt,
  classId,
  page
}: PostHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const onDeleteClick = () => setShowDeleteAlert(!showDeleteAlert);

  const { mutate: deleteReview } = useDeleteReview();

  return (
    <Container>
      <h1 id="post-title">{title}</h1>
      <DividerLine />
      <Info>
        {isAuthor ? (
          <Tools>
            <Button onClick={() => navigate(`/review/${reviewId}`)}>
              <EditIcon width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} />
            </Button>
            <Button onClick={onDeleteClick}>
              <DeleteIcon width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} />
            </Button>
          </Tools>
        ) : (
          <Button>
            <Siren width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} />
          </Button>
        )}
        <Writer>
          <p>작성일 : {formatDate(createdAt, 1)}</p>
          <p>작성자 : {author}</p>
        </Writer>
      </Info>

      {showDeleteAlert && (
        <ModalTwoBtns
          message={
            <AlertText>
              해당 게시글을 삭제하면{'\n'}
              추후에 <span>복구가 불가</span>합니다.{'\n'} 삭제 하시겠습니까?
            </AlertText>
          }
          onClose={onDeleteClick}
          onPrimaryClick={() => deleteReview({ classId, reviewId: String(reviewId), page })}
          showButtons={true}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  h1 {
    margin: 0;
    color: var(--main-white);
    text-align: center;
    font-size: 18px;
    font-weight: 600;

    ${({ theme }) => theme.media.tablet} {
      font-size: 22px;
    }
  }
`;
const DividerLine = styled.div`
  width: 100%;
  height: 0.8px;
  margin: 24px 0;
  background: #d9d9d9;

  ${({ theme }) => theme.media.tablet} {
    height: 1.5px;
    margin: 20px 0;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const Writer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 8px;

  p {
    margin: 0;
    color: var(--text-secondary-gray);
    text-align: center;
    font-size: 10px;
    font-weight: 400;

    ${({ theme }) => theme.media.tablet} {
      font-size: 14px;
    }
  }
`;
const Tools = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    gap: 14px;
  }
`;
const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;
const AlertText = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;

  span {
    color: #a60f62;
    font-weight: bold;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;
