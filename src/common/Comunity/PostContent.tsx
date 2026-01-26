import { useState, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';

import CommentPhoto from '../../assets/Community/CommentPhoto.svg';
import Edit from '../../assets/Community/EditButton.svg';
import Delete from '../../assets/Community/DeleteButton.svg';
import Alert from '../../assets/Community/SirenButton.svg';

import { ModalTwoBtns } from '../../components/modals';
import axiosInstance from '../../api/axios-instance';

import { SinglePostData } from '@/types/CommunityInterface';
import { UserData } from '@/types/UserInterface';
import { toast } from 'react-toastify';

type PostContentProps = {
  length: number;
  handleModal: (imgUrl: string) => void;
  selectedPost: SinglePostData;
  user: UserData | null;
  setListReload: Dispatch<any>;
};

const PostContent = ({
  length,
  handleModal,
  selectedPost,
  user,
  setListReload
}: PostContentProps) => {
  const navigate = useNavigate();

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  // 게시글에서 삭제버튼 눌렀을때
  const handleDelete = (): void => {
    setShowConfirmDelete(true);
  };

  // 모달창에서 삭제버튼 눌렀을때
  const handleDeleteConfirm = async (): Promise<void> => {
    try {
      await axiosInstance.delete(`/community/posts/${selectedPost.postId}`);
      setListReload((prev: boolean) => !prev);
      navigate('/community');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  const handleReport = () => {
    toast.error('게시글이 신고되었습니다.');
  };

  return (
    <>
      <PostInfo>
        <PostStats>
          <CommentContainer src={CommentPhoto} alt={'Comment'} />
          <TextContainer>{length || 0}</TextContainer>
        </PostStats>
        <PostMeta>
          <span>작성일 : {formatDate(selectedPost?.createdAt!, 1)}</span>
        </PostMeta>
      </PostInfo>
      <PostInfo>
        {user?.userId === selectedPost?.userId ? (
          <PostActions>
            <ButtonContainer
              onClick={() =>
                navigate(`/community/edit/${selectedPost.postId}`, {
                  state: { selectedPost }
                })
              }
              src={Edit}
              alt={'Edit'}
            />
            <ButtonContainer
              src={Delete}
              alt={'Delete'}
              onClick={() => handleDelete()}
            />
          </PostActions>
        ) : (
          <PostActions>
            <ReportButton
              onClick={() => handleReport()}
              src={Alert}
              alt={'Alert'}
            />
          </PostActions>
        )}
        <PostMeta>
          <span>작성자 : {selectedPost?.author}</span>{' '}
        </PostMeta>
      </PostInfo>
      <Content>
        {selectedPost?.content}
        {selectedPost?.images.length > 0 && (
          <ImageContainer>
            {selectedPost?.images.map((img) => (
              <Image src={img} alt={'Image'} onClick={() => handleModal(img)} />
            ))}
          </ImageContainer>
        )}
        <br />
      </Content>

      {showConfirmDelete && (
        <ModalTwoBtns
          message={
            <AlertText>
              해당 게시글을 삭제하면{'\n'}
              추후에 <ColoredText>복구가 불가</ColoredText>합니다.
              {'\n'}
              삭제 하시겠습니까?
            </AlertText>
          }
          onClose={() => setShowConfirmDelete(false)}
          onSecondaryClick={handleDeleteConfirm}
          showButtons={true}
          primaryLabel="취소"
          secondaryLabel="삭제하기"
        />
      )}
    </>
  );
};

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostStats = styled.div`
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #b2b2b2;

  margin-left: 10px;
  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const CommentContainer = styled.img`
  display: flex;
  width: 28px;
  height: 28px;

  margin-bottom: 5px;
  margin-right: 5px;
`;

const ButtonContainer = styled.img`
  display: flex;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;

  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-right: 10px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 10px;

  margin-left: 10px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #888;

    &:hover {
      color: #ff4444;
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: flex-end;

  color: #b2b2b2;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 35px;
  margin-bottom: 40px;
  text-align: justify;
  min-height: 200px;
  white-space: pre-wrap;
  word-break: break-all;

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: 57px;
    min-height: 200px;
  }

  p {
    line-height: 1.5;
    font-size: 1em;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 45px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, 1fr);
    justify-content: start;
    gap: 16px;
  }
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 3px;

  ${({ theme }) => theme.media.tablet} {
    border-radius: 7px;
  }
`;

const ReportButton = styled.img`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
`;

const ColoredText = styled.span`
  color: #a60f62;
  font-weight: bold;
`;

export default PostContent;
