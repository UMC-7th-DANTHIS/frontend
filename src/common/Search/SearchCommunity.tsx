import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import imgDesc from '../../assets/Search/imageDescript.svg';

import Pagination from '../../components/Pagination';
import SearchNothing from './SearchNothing';
import useSearch from '../../hooks/useSearch';

type SearchCommunityParams = {
  query: string | null;
  select: 'posts';
};

const SearchCommunity = ({ query, select }: SearchCommunityParams) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData: number = 5;

  const { data } = useSearch<'posts'>(select, query, currentPage);

  const handleNavigate = async (id: number): Promise<void> => {
    navigate(`/community/${id}`);
  };

  return (
    <Container>
      {data?.data.results.length ? (
        <>
          <CommunityLists>
            {data?.data.results.map((list, index) => (
              <CommunityWrapper>
                <CommunityList
                  key={index}
                  onClick={() => handleNavigate(list.id)}
                >
                  <TextContainer>
                    <Title>{list.title}</Title>
                    {list.postImages.length > 0 && (
                      <ImgDescriptContainer>
                        <ImgDescript src={imgDesc} alt={'사진 있어요'} />
                      </ImgDescriptContainer>
                    )}
                    <Content>{list?.content.slice(0, 300)}</Content>
                  </TextContainer>
                </CommunityList>
              </CommunityWrapper>
            ))}
          </CommunityLists>
          <PaginationContainer>
            <Pagination
              dataLength={data?.data.pagination.totalResults}
              perData={perData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </PaginationContainer>
        </>
      ) : (
        <SearchNothing />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 120px;
`;

const CommunityLists = styled.div`
  width: 100%;
  padding: 0 auto;

  border-top: 2px solid #ddd;
`;

const CommunityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 2px solid #ddd;
  cursor: pointer;
`;

const CommunityList = styled.div`
  width: 100%;
  max-width: 970px;

  padding-top: 41px;
  padding-bottom: 41px;

  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const TextContainer = styled.div`
  flex-direction: column;
  border: 1px solid #dddddd;
  border-radius: 10px;

  padding-left: 50px;
  padding-right: 39px;
  padding-top: 29px;
  padding-bottom: 29px;

  color: white;
  font-style: normal;
  line-height: normal;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ImgDescriptContainer = styled.div`
  display: inline-flex;
  width: 20px;
  height: 20px;
  padding-left: 10px;
`;

const ImgDescript = styled.img`
  margin-top: 3px;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #b2b2b2;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 91px;
`;

export default SearchCommunity;
