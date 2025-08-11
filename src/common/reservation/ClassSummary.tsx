import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../utils/format';
import useDeleteLiked from '../../hooks/reservation/useDeleteLiked';
import usePostChat from '../../hooks/reservation/usePostChat';
import usePostLiked from '../../hooks/reservation/usePostLiked';
import useGetMyLiked from '../../hooks/reservation/useGetMyLiked';
import { Level } from './Level';
import { DanceGenre } from '../../api/schema';
import { DanceClassDetail, LikedClass } from '../../types/class';

interface ClassSummaryProps {
  classId: string;
  classData: DanceClassDetail;
}

export const ClassSummary = ({ classId, classData }: ClassSummaryProps) => {
  console.log(classData);
  const [isLiked, setIsLiked] = useState(false);

  const { data: myLiked } = useGetMyLiked();
  const { mutate: postChat } = usePostChat();
  const { mutate: postLiked } = usePostLiked();
  const { mutate: deleteLiked } = useDeleteLiked();

  const handleChatClick = (dancerId: number) => postChat(dancerId);
  const handleLikeClick = () => {
    if (!isLiked) postLiked(classId);
    else deleteLiked(classId);
  };

  useEffect(() => {
    if (!myLiked || !classId) return;

    const matched = myLiked.danceClasses?.some((cls: LikedClass) => cls.id === Number(classId));
    setIsLiked(!!matched);
  }, [myLiked, classId]);

  return (
    <Summary>
      <Image src={classData?.dancer.profileImage} alt={`dancer profile of class #${classData?.id}`} />
      <InfoContainer>
        <p>강사 : {classData?.dancer?.name}</p>
        <p>장르 : {DanceGenre.find((g) => Number(g.id) === classData?.genre)?.Genre}</p>
        <p>가격 : {formatPrice(classData?.pricePerSession)}원 / 회당</p>
        <Level level={classData?.difficulty} />
      </InfoContainer>
      <BtnContainer>
        <ChatBtn type="button" onClick={() => handleChatClick(classData.details.dancerId)}>
          <span>댄서와 1:1 채팅하기</span>
        </ChatBtn>
        <LikeBtn type="button" onClick={() => handleLikeClick()} $isLiked={isLiked}>
          <span>{isLiked ? '찜한 수업 취소하기' : '수업 찜해놓기'}</span>
        </LikeBtn>
      </BtnContainer>
    </Summary>
  );
};

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 38px;
  padding-bottom: 53px;
`;
const Image = styled.img`
  width: 298px;
  height: 298px;
  border-radius: 10px;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 298px;
  margin-left: 53px;
  margin-right: 120px;

  p {
    margin: 3px 0;
    color: var(--main-white);
    font-size: 28px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: -1.4px;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChatBtn = styled.button`
  display: flex;
  width: 420px;
  padding: 10px 43px;
  margin-bottom: 23px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 68px;
  border: none;
  background: var(--main-gradation);
  cursor: pointer;

  span {
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: -1.2px;
  }
`;
const LikeBtn = styled.button<{ $isLiked: boolean }>`
  display: flex;
  width: 420px;
  padding: 10px 87px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  border: 4px solid var(--main_purple, #9819c3);
  background: ${({ $isLiked }) => ($isLiked === true ? 'var(--main-white)' : 'transparent')};
  cursor: pointer;

  &:hover {
    background: rgba(152, 25, 195, 0.4);
  }

  span {
    color: ${({ $isLiked }) => ($isLiked === true ? 'var(--text-purple)' : 'var(--main-white)')};
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: -1.2px;
  }
`;
