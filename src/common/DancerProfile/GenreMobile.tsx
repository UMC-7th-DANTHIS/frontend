import React, {useState} from 'react';
import styled from 'styled-components';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusedcircle.svg';


type GenreType = {
  id: number;
  name: string;
};


const GenreMobile : React.FC=()=> {
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
    const [selectedGenre, setSelectedGenre] = useState<number>(1);

      const handleGenreClick = (genre: number) => {
    setSelectedGenre(genre);
  };

  return (
    <Layout>
        <SidebarContainer>
      <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.name}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
      <GenreMobile />
      </SidebarContainer>
    </Layout>
  )
}

export default GenreMobile;

const Layout = styled.div`
  display: flex;

 ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

const Sidebar = styled.div`
   display: none;
   ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: column;
    height: 900px;
    margin-top: 14px;
  }
`;
const SidebarContainer = styled.div`
`

const Line = styled.div`
  width: 0px;
  height: 770px;
  border: 2px solid var(--main_purple, #9819c3);
`;
const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
  margin-bottom: 50px;

  &:hover {
    cursor: pointer;
  }
`;

const Genre = styled.div<{ $isActive: boolean }>`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.9px;
  transition: all 0.3s ease;

  ${({ $isActive }) =>
    $isActive &&
    `margin-left: 13px;
    color: var(--main_white, #fff);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -1.2px;`}
    
  //   ${({ theme }) => theme.media.tablet} {
  //  font-size: 40px;
  // }
`;