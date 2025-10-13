import React, {useState} from 'react';
import styled from 'styled-components';
import { ReactComponent as FocusedCircle } from '../../assets/shape/focusdcirclemobile.svg';


type GenreType = {
  id: number;
  name: string;
};

type Props = {
  genres: GenreType[];
  selectedGenre: number;
  onChange: (id: number) => void;
};

const SidebarMobile: React.FC<Props> = ({ genres, selectedGenre, onChange }) => {
  return (
    <Layout>
        <Sidebar>
        {genres.map((genre) => (
          <GenreWrapper
            key={genre.id}
            onClick={() => onChange(genre.id)}
          >
            {selectedGenre === genre.id && <FocusedCircle />}
            <Genre $isActive={selectedGenre === genre.id}>{genre.name}</Genre>
          </GenreWrapper>
        ))}
      </Sidebar>
    </Layout>
  )
}

export default SidebarMobile;

const Layout = styled.div`
  //width: 100%;
  width: 343px;
  align-items: center;
  margin-top: -30px;
  justify-content: center;
 ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

const Sidebar = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 29px;
    align-items: center;
    justify-content: center;
    justify-items: center;
`;

const GenreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 25px;
  margin-bottom: 20px;
  //gap: 5px;
    justify-content: center;
    //text-align: right;
  &:hover {
    cursor: pointer;
  }
`;

const Genre = styled.div<{ $isActive: boolean }>`
  color: var(--text_secondary-gray, #b2b2b2);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.8px;
  transition: all 0.3s ease;
  width: 60px;
  justify-content: center;
  text-align: center;
  margin-right: 5px;

  ${({ $isActive }) =>
    $isActive &&
    `
    justify-content: center;
    margin-left: -5px;
    color: var(--main_white, #fff);
    font-size: 17px;
    width: 70px;
    font-weight: 600;
    letter-spacing: -0.9px;`}
    

`;