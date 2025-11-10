import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircleIcon from '../../assets/shape/circle.svg';
import api from '../../api/api';
import axios from 'axios'

interface ProfileProps {
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
};

type GenreType = {
  id: number;
  name: string;
};

const Profile: React.FC<ProfileProps> = ({ dancer }) => {
  const [isLiked, setIsLiked] = useState<boolean>(Boolean(dancer?.isFavorite));
  // const { dancerId } = useParams<{ dancerId: string }>();
  const isLoggedIn = !!localStorage.getItem('token'); // 로그인 상태 확인
  const [likePending, setLikePending] = useState(false);

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

   /** 1) props로 온 isFavorite에 맞춰 동기화 */
  useEffect(() => {
    setIsLiked(!!dancer?.isFavorite);
  }, [dancer?.isFavorite]);

  /** 2) 서버의 내 즐겨찾기 목록으로 한 번 더 정확히 동기화 */
  useEffect(() => {
    if (!isLoggedIn || !dancer?.id) return;

    let cancelled = false;
    (async () => {
      try {
        let liked = false;
        let page = 1;
        while (true) {
          const res = await api.get('/users/dancers', { params: { page } });
          const data = res.data?.data ?? {};
          const dancers = Array.isArray(data.dancers) ? data.dancers : [];
          if (dancers.some((it: any) => Number(it.id) === Number(dancer.id))) {
            liked = true;
            break;
          }
          const cur = Number(data.currentPage ?? page);
          const total = Number(data.totalPages ?? page);
          if (!total || cur >= total) break;
          page = cur + 1;
        }
        if (!cancelled) setIsLiked(liked);
      } catch (e) {
        console.error('내 찜한 댄서 목록 조회 실패:', e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, dancer?.id]);


const handleLikeClick = async () => {
  if (!isLoggedIn || !dancer || likePending) return;

  setLikePending(true);

  try {
    if (!isLiked) {
      // 찜 추가: 즉시 반영
      setIsLiked(true);
      await api.post(`/users/${dancer.id}/favorite`);
    } else {
      // 찜 취소: 즉시 반영
      setIsLiked(false);
      await api.delete(`/users/${dancer.id}/favorite`);
    }
  } catch (error) {
    // 실패 시 롤백
    setIsLiked((prev) => !prev);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const msg = String(error.response?.data?.message ?? '');
      // 서버가 "이미 찜"이라고 응답 → 서버 상태 기준으로 동기화
      if (status === 400 && msg.includes('이미 찜')) {
        setIsLiked(true);
        setLikePending(false);
        return;
      }
    }
    console.error('찜 상태 변경 중 오류 발생:', axios.isAxiosError(error) ? error.response?.data || error.message : error);
  } finally {
    setLikePending(false);
  }
};

  const handleChatClick = async () => {
    if (!dancer) return;
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
          '채팅 신청 중 오류 발생:',
          error.response?.data || error.message
        );
      } else {
        console.error('예상치 못한 에러:', error);
      }
    }
  };

  // 소개글 포맷팅 함수
  const formatIntroduce = (text: string, maxLength = 32): string => {
    return text.match(new RegExp(`.{1,${maxLength}}`, 'g'))?.join('\n') || text;
  };

   if (!dancer) return <div>로딩 중...</div>;

  return (
    <Layout>
      <NameContainer>
        <Circle src={CircleIcon} />
        <Name>{dancer.dancerName}</Name>
      </NameContainer>
      <ProfileContainer>
        <MobileContainer>
        <Dancerimg src={dancer.dancerImages?.[0]} />
        <InfoContainer>
          <Title>Instagram</Title>
          <Content>{dancer.instargramId}</Content>
          <Title>주 장르</Title>
          <Content>
            {dancer.preferredGenres
              ?.map(
                (genreId) => genres.find((genre) => genre.id === genreId)?.name
              )
              .filter(Boolean) // undefined 값 제거
              .join(', ') || '알 수 없음'}
          </Content>
          <Title>한 마디 소개글</Title>
          <Content>{formatIntroduce(dancer.bio)}</Content>
        </InfoContainer>
        </MobileContainer>
        <ButtonContainer>
             {isLoggedIn ? (
             <>
              <ChatButton onClick={handleChatClick}>
                댄서와 1:1 채팅하기
              </ChatButton>
              <LikeButton $isLiked={!!isLiked} onClick={handleLikeClick} disabled={likePending}>
                {isLiked ? '찜 취소하기' : '댄서 찜해놓기'}
              </LikeButton>
              </>  
             ) : (
              <span>로그인 후 이용 가능합니다</span>
             )} 
        </ButtonContainer>
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.media.tablet} {
    padding-top: 32px;
  }
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  margin-bottom: 35px;
  align-items: center;
  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
     margin-top: 39.84px;
     margin-bottom: 100px;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Circle = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  ${({ theme }) => theme.media.tablet} {
    width: 24px;
    height: 24px;
  }
`;

const Name = styled.div`
  color: var(--main_white, #fff);
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.9px;
  margin-left: 10.84px;
  font-family: Pretendard;
  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
    letter-spacing: -0.9px;
  }
`;

const Dancerimg = styled.img`
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 6px;
  ${({ theme }) => theme.media.tablet} {
    width: 250px;
    height: 250px;
    border-radius: 10px;
  }
`;

const InfoContainer = styled.div`
  margin-left: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 144px;
  ${({ theme }) => theme.media.tablet} {
    margin-left: 46px;
    width: 351px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 22px;
  ${({ theme }) => theme.media.tablet} {
    align-items: flex-end;
      margin-left: 31px;
  }
`;

const Title = styled.div`
  color: var(--text_purple, #bf00ff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px; 
  letter-spacing: -0.8px;
  ${({ theme }) => theme.media.tablet} {
    font-size: 22px;
    letter-spacing: -1.1px;
  }
`;
const Content = styled.div`
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.7px;
  margin-bottom: 15px;
  white-space: pre-wrap; /* 줄바꿈 처리 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
  &:last-child {
    margin-bottom: 0;
  }
  ${({ theme }) => theme.media.tablet} {
    font-size: 18px;
    letter-spacing: -0.9px;
    margin-bottom: 30px;
  }
`;

const ChatButton = styled.button`
  display: flex;
  width: 314px;
  height: 45px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -0.8px;
  cursor: pointer;
  margin-top: 35px;
  ${({ theme }) => theme.media.tablet} {
    width: 360px;
    height: 60px;
    font-size: 20px;
    letter-spacing: -1.2px;
  }
`;

const LikeButton = styled.button<{ $isLiked: boolean }>`
  display: flex;
  width: 314px;
  height: 45px;
  padding: 10px 87px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  border: 4px solid var(--main_purple, #9819c3);
  background: ${({ $isLiked }) => ($isLiked === true ? '#FFF' : 'transparent')};
  color: ${({ $isLiked }) => ($isLiked === true ? 'var(--text_purple, #BF00FF)' : '#FFF')};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 208.333% */
  letter-spacing: -0.8px;
  margin-top: 18px;
  cursor: pointer;
    
  ${({ theme }) => theme.media.tablet} {
    width: 360px;
    height: 60px;
    font-size: 20px;
    letter-spacing: -1.2px;
    margin-top: 26.34px;
    &:hover {
    cursor: pointer;
    background: rgba(152, 25, 195, 0.4);
  }
  }
`;
