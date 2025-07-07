import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import imgDesc from '../../assets/Search/imageDescript.svg';

import Pagination from '../../components/Pagination';
import SearchNothing from './SearchNothing';
import useSearch from '../../hooks/useSearch';
import axiosInstance from '../../api/axios-instance';

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
    try {
      const response = await axiosInstance.get(`/community/posts/${id}`);
      navigate(`/community/${id}`, {
        state: { selectedPost: response.data.data }
      });
    } catch (error) {
      alert('게시물 가져오기 실패');
    }
  };

  return (
    <Container>
      {data?.data.results.length ? (
        <>
          <CommunityLists>
            {data?.data.results.map((list) => (
              <CommunityList onClick={() => handleNavigate(list.id)}>
                <TextContainer>
                  <Title>{list.title}</Title>
                  {list.postImages && (
                    <ImgDescriptContainer>
                      <ImgDescript src={imgDesc} alt={'사진 있어요'} />
                    </ImgDescriptContainer>
                  )}
                  <Content>{list?.content.slice(0, 300)}</Content>
                </TextContainer>
              </CommunityList>
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

const Container = styled.div``;

const CommunityLists = styled.div`
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
`;

const CommunityList = styled.div`
  padding-left: 114px;
  padding-right: 114px;
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
  font-size: 22px;
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
  font-size: 18px;
  font-weight: 500;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 91px;
`;

export default SearchCommunity;
