import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../api/api';

const Quit = () => {
  const navigate = useNavigate();

  const handleQuit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('토큰이 없습니다.');

      const response = await api.delete('/auth/withdraw');
      console.log('회원 탈퇴 성공:', response.data);

      localStorage.removeItem('token');
      navigate('/');
    } catch (error: any) {
      if (error) {
        console.error('회원 탈퇴 실패:', error.message);
      }
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <QuitContainer>
      <Title> 회원 탈퇴 </Title>
      <Content> 유저님 가지 마세요 엉엉 제가 잘할게요...</Content>
      <QuitButton onClick={handleQuit}> 탈퇴하기 </QuitButton>
    </QuitContainer>
  );
};

export default Quit;

const QuitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 73px;
  flex-direction: column;
`;

const Title = styled.div`
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  color: #fff;
  width: 691.688px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  margin-top: 78px;
  text-align: justify;
`;

const QuitButton = styled.button`
  margin-top: 102px;
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 2px solid #9819c3;
  background-color: transparent;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #9819c3;
  }
`;
