import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDeleteLiked from '../../hooks/reservation/useDeleteLiked';
import usePostChat from '../../hooks/reservation/usePostChat';
import usePostLiked from '../../hooks/reservation/usePostLiked';
import useGetMyLiked from '../../hooks/reservation/useGetMyLiked';
import { LikedClass } from '../../types/class';

interface ClassButtonsProps {
  classId: string;
  dancerId: number;
}

export const ClassButtons = ({ classId, dancerId }: ClassButtonsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const { mutate: postChat } = usePostChat();
  const { mutate: postLiked } = usePostLiked();
  const { mutate: deleteLiked } = useDeleteLiked();

  const handleChatClick = (dancerId: number) => postChat(dancerId);
  const handleLikeClick = () => {
    if (!isLiked) postLiked(classId);
    else deleteLiked(classId);
  };

  const { data: myLiked } = useGetMyLiked();

  useEffect(() => {
    if (!myLiked || !classId) return;

    const matched = myLiked.danceClasses?.some((cls: LikedClass) => cls.id === Number(classId));
    setIsLiked(!!matched);
  }, [myLiked, classId]);

  return (
    <ButtonsWrapper>
      <ChatButton type="button" onClick={() => handleChatClick(dancerId)}>
        <span>댄서와 1:1 채팅하기</span>
      </ChatButton>
      <LikeButton type="button" onClick={() => handleLikeClick()} $isLiked={isLiked}>
        <span>{isLiked ? '찜한 수업 취소하기' : '수업 찜해놓기'}</span>
      </LikeButton>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const ChatButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 314px;
  height: 45px;
  margin: 0;
  border-radius: 68px;
  border: none;
  background: var(--main-gradation);
  cursor: pointer;

  ${({ theme }) => theme.media.desktop} {
    width: 360px;
    height: 56px;
  }

  span {
    color: var(--main-white);
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.8px;
    white-space: preserve nowrap;

    ${({ theme }) => theme.media.desktop} {
      font-size: 20px;
      line-height: 50px;
      letter-spacing: -1px;
    }
  }
`;
const LikeButton = styled.button<{ $isLiked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 314px;
  height: 45px;
  gap: 8px;
  border-radius: 54px;
  border: 2px solid var(--main_purple, #9819c3);
  background: ${({ $isLiked }) => ($isLiked === true ? 'var(--main-white)' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(152, 25, 195, 0.4);
  }

  ${({ theme }) => theme.media.desktop} {
    width: 360px;
    height: 56px;
  }

  span {
    color: ${({ $isLiked }) => ($isLiked === true ? 'var(--text-purple)' : 'var(--main-white)')};
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.8px;

    ${({ theme }) => theme.media.desktop} {
      font-size: 20px;
      line-height: 50px;
      letter-spacing: -1px;
    }
  }
`;
