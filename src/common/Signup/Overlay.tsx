import React from 'react';
import styled from 'styled-components';
//import SampleImage from '../../../assets/image.png';
import { ReactComponent as PlusButton } from '../../assets/buttons/plus-button.svg';

export type DancerType = {
  id: number;
  name: string;
  image?: string;
};

interface OverlayProps {
  onclose: () => void;
  onSelectUser: (user: DancerType) => void;
  searchResults: DancerType[];
  children?: React.ReactNode;
}

interface IsLastProp {
  isLast?: boolean;
}


const Overlay : React.FC<OverlayProps> = ({ onclose, onSelectUser, searchResults }) => {
    console.log("Received searchResults in UserOverlay:", searchResults);
    const dummyData = [
        { id: 1, username: '써sk', images: ['https://via.placeholder.com/50'] },
        { id: 2, username: '타니아', images: ['https://via.placeholder.com/50'] },
        { id: 3, username: '뉴비', images: ['https://via.placeholder.com/50'] },
        { id: 4, username: '애니', images: ['https://via.placeholder.com/50'] },
        { id: 5, username: '누누', images: ['https://via.placeholder.com/50'] },
      ];
  const limitedUsers = dummyData.slice(0, 5);

   // 오버레이 배경 클릭 핸들러
   const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onclose(); // 오버레이 닫기 함수 호출
    }
  };

  // PlusButton 클릭 핸들러
  const handleSelectUser = (user:DancerType) => {
    onSelectUser(user); // 선택된 사용자 전달
    onclose(); // 오버레이 닫기
  };
 // 검색 결과가 없을 경우 처리
 const results = searchResults.length > 0 ? searchResults : [];

  return (
    <Container onClick={handleOverlayClick}>
      <AllContainer >
        <ImageContainer>
          {results.map((user, index) => (
            <ImageList key={user.id}>
              <ListImage
                src={user.image}
                alt={'userImage'}
              />
              <UserName isLast={index === results.length - 1}>
                {user.name}
              </UserName>
              <Icon isLast={index === results.length - 1}>
                <PlusButton width={40} height={40} onClick={() => handleSelectUser(user)}  />
              </Icon>
            </ImageList>
          ))}
        </ImageContainer>
      </AllContainer>
    </Container>
  );
};

export default Overlay;


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 36px;
  margin-left: 56px;
  margin-right: 56px;
`;

const AllContainer = styled.div`
  width: 528px;
  height: 494px;
  border-radius: 15px;
  border: 1px solid #a60f62;
  background: #000;
  display: flex;
  flex-direction: column;
  /* padding: 36px 56px 0 56px; */
`;

const ImageList = styled.div`
  display: flex;
  align-items: center;
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
`;
const UserName = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLast', // isLast를 DOM으로 전달하지 않도록 설정
})<IsLastProp>`
  font-size: 20px;
  color: ${({ isLast }) => (isLast ? '#fff' : '#4D4D4D')};
  margin-left: 22px;
  font-weight: 600;
  line-height: 1.5;
`;
// const UserName = styled.div`
//   font-size: 20px;
//   color: ${({ isLast }) => (isLast ? '#fff' :'#4D4D4D' )};
//   margin-left: 22px;
//   font-weight: 600;
//   line-height: 1.5;
// `;

// const Icon = styled.div`
//   margin-left: auto;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg rect {
//     stroke: ${({ isLast }) => (isLast ?  '#9819C3' : '#4D4D4D' )};
//   }

//   svg path {
//     fill: ${({ isLast }) => (isLast ? '#9819C3' : '#4D4D4D' )};
//   }
// `;
const Icon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLast',
})<IsLastProp>`
  margin-left: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg rect {
    stroke: ${({ isLast }) => (isLast ? '#9819C3' : '#4D4D4D')};
  }

  svg path {
    fill: ${({ isLast }) => (isLast ? '#9819C3' : '#4D4D4D')};
  }
`;
