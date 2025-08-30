import styled from 'styled-components';

import NoSearch from '../../assets/Search/search.svg';

const SearchNothing = () => {
  return (
    <Container>
      <ImageContainer />
      <TextContainer>
        <Text>
          검색어와 일치하는 결과가 없습니다.
          <br />
          검색어를 다시 확인해주세요.
        </Text>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 580px;
  border-top: 2px solid #ddd;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  margin-top: 80px;

  ${({ theme }) => theme.media.tablet} {
    width: 350px;
    height: 350px;
  }

  background-image: url(${NoSearch});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.4;
  filter: brightness(0.4);
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  margin-top: 80px;
`;

const Text = styled.p`
  color: white;
  font-size: 24px;
  line-height: 30px;
  font-weight: 499;
  text-align: center;
`;

export default SearchNothing;
