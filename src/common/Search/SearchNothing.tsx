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
  width: 1200px;
  height: 400px;
  border-top: 2px solid #ddd;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  margin-top: 80px;

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
