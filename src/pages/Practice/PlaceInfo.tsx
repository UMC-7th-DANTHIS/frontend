import React from "react";
import styled from "styled-components";
interface PlaceInfoProps {
  name: string;
  address?: string;
  url: string;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ name, address, url }) => {
  return (
    <Wrapper>
      <strong>{name}</strong>
      <Container>
      <p>{address}</p>
      <a href={url} target="_blank" rel="noreferrer">
        자세히 보기  &gt;
      </a>
      </Container>
    </Wrapper>
  );
};

export default PlaceInfo;
const Wrapper = styled.div`
  width: 320px;
  height: 74px;
  border-radius: 1.287px;
  background-color: #FFF;
  box-shadow: 0 0 1.287px 0 rgba(0, 0, 0, 0.40);
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 5px;
  strong {
    color: var(--main_black, #000);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 4px;
  }

  p {
    color: var(--text_gray, #4D4D4D);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  a {
    color: var(--highlight_blue, #07F);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration: none;
    margin-left: 18px;
  }
`;
  const Container = styled.div`
    display: flex;
    `
