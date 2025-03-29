import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CircleIcon from '../../../assets/shape/circle.svg';
import DancerPic from '../../../assets/dummyphoto/dancer.svg';
import api from '../../../api/api';
import axios from 'axios'


interface ProfileProps{
  dancer: DancerType | null;
}

type DancerType = {
  id: number;
  dancerName: string;
  dancerImages: string[];
  isFavorite: boolean;
  instargramId: string;
  preferredGenres: number[];
  bio: string;
}

type GenreType = {
  id : number;
  name : string;
}

const Profile: React.FC<ProfileProps> = ({ dancer }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const { dancerId } = useParams<{dancerId: string}>();

  const genres: GenreType[] = [
    { id: 1, name: '힙합' },
    { id: 2, name: '걸스힙합' },
    { id: 3, name: '팝핑' },
    { id: 4, name: '락킹' },
    { id: 5, name: '왁킹' },
    { id: 6, name: '걸리시/힐' },
    { id: 7, name: '크럼프' },
    { id: 8, name: '텃팅' },
    { id: 9, name: '코레오' },
    { id: 10, name: 'K-pop' }
  ];

  // 서버에서 받은 isFavorite 값으로 초기 상태 설정
  useEffect(() => {
    if (dancer?.isFavorite !== undefined) {
      setIsLiked(dancer.isFavorite);
    }
  }, [dancer]);

  if (!dancer) {
    return <div>로딩 중...</div>; // dancer가 null일 때 로딩 메시지 표시
  }

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // 찜 취소 API 호출
        const response = await api.delete(`/users/${dancer.id}/favorite`);
        if (response.data.code === 200) {
          console.log('찜 취소 성공:', response.data.message);
        } else {
          console.error('찜 취소 실패:', response.data.message);
        }
      } else {
        // 찜 추가 API 호출
        const response = await api.post(`/users/${dancer.id}/favorite`);
        if (response.data.code === 200) {
          console.log('찜 성공:', response.data.message);
        } else {
          console.error('찜 실패:', response.data.message);
        }
      }

      // 상태 토글
      setIsLiked((prev) => !prev);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          '찜 상태 변경 중 오류 발생:',
          error.response?.data || error.message
        );
      } else {
        console.error('예상치 못한 에러:', error);
      }
    }
  }
  const handleChatClick = async () => {
    try {
      const response = await api.post(`/chats/${dancer.id}/start`);
      if (response.data.code === 200) {
        console.log('채팅 신청 성공:', response.data.message);
        console.log(response.data.data.openChatUrl);
        const chatUrl = response.data.data.openChatUrl;
        if (chatUrl) {
          window.open(chatUrl, '_blank'); // 새 탭에서 열기
        } else {
          console.error('채팅 URL이 없습니다.');
        }

        // 성공 시 처리 (예: 채팅 화면으로 이동)
      } else {
        console.error('채팅 신청 실패:', response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          '채팅 신청청 중 오류 발생:',
          error.response?.data || error.message
        );
      } else {
        console.error('예상치 못한 에러:', error);
      }
    }
  }
    
   

  // 소개글 포맷팅 함수
  const formatIntroduce = (text: string, maxLength = 32): string => {
    return text.match(new RegExp(`.{1,${maxLength}}`, 'g'))?.join('\n') || text;
  };

  return (
    <Layout>
      <NameContainer>
        <Circle src={CircleIcon} />
        <Name>{dancer.dancerName}</Name>
      </NameContainer>
      <ProfileContainer>
        <Dancerimg src={dancer.dancerImages?.[0]} />
        <InfoContainer>
          <Title>Instagram</Title>
          <Content>{dancer.instargramId}</Content>
          <Title>주 장르</Title>
          <Content>{dancer.preferredGenres
    ?.map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
    .filter(Boolean) // undefined 값 제거
    .join(', ') || "알 수 없음"}
    </Content>
          <Title>한 마디 소개글</Title>
          <Content>{formatIntroduce(dancer.bio)}</Content>
        </InfoContainer>
        <ButtonContainer>
          <ChatButton onClick={handleChatClick}>댄서와 1:1 채팅하기</ChatButton>
          <LikeButton isLiked={isLiked} onClick={handleLikeClick}>
            {isLiked ? '찜 취소하기' : '댄서 찜해놓기'}
          </LikeButton>
        </ButtonContainer>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 119px;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 153px;
  margin-top: 39.84px;
  margin-bottom: 100px;
`;

const Circle = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const Name = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.5px;
  margin-left: 10.84px;
`;

const Dancerimg = styled.img`
  width: 250px;
  height: 250px;
  flex-shrink: 0;
  border-radius: 10px;
  //background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

const InfoContainer = styled.div`
  margin-left: 46px;
  //margin-top : 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 351px;
`;

const ButtonContainer = styled.div`
  margin-left: 67px;
  margin-right: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Title = styled.div`
  color: var(--text_purple, #bf00ff);
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; /* 136.364% */
  letter-spacing: -1.1px;
`;
const Content = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: -0.9px;
  margin-bottom: 30px;
  white-space: pre-wrap; /* 줄바꿈 처리 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
  &:last-child {
    margin-bottom: 0;
  }
`;

const ChatButton = styled.button`
  display: flex;
  width: 420px;
  padding: 10px 43px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 68px;
  background: var(
    --main-gradation,
    linear-gradient(90deg, #b30505 0%, #9819c3 100%)
  );
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
  cursor: pointer;
`;

const LikeButton = styled.button< {isLiked: boolean | null}>`
  display: flex;
  width: 420px;
  padding: 10px 87px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  border: 4px solid var(--main_purple, #9819c3);
  color: var(--main_white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -1.2px;
  background: none;
  margin-top: 26.34px;
  cursor: pointer;
`;
