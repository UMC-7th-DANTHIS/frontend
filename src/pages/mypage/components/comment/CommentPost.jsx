import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummyContent from '../../../../store/community/dummyContent';
import Pagination from '../../../../components/Pagination';
import { ReactComponent as ExistPhoto } from '../../../../assets/photo.svg';

const CommentPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  useEffect(() => {
    setPost(dummyContent);
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * perData;
    const endIndex = startIndex + perData;
    return post.slice(startIndex, endIndex);
  };

  return (
    <AllContainer>
      {getCurrentPageData().map((post) => (
        <CommentContainer key={post.No} onClick={console.log(post.No)}>
          <ContentsContainer onClick={() => navigate('/community')}>
            <PhotoandTitle>
              <CommentTitle>{post.Title}</CommentTitle>
              <IconContainer>
                {post.Image && post.Image.filter(Image => Image !== null).length > 0 && (
                  <ExistPhoto width={20} height={20} />
                )}
              </IconContainer>
            </PhotoandTitle>
            <CommentContents>
              {post.Content.length > 210
                ? post.Content.slice(0, 209) + '...'
                : post.Content}
            </CommentContents>
          </ContentsContainer>
        </CommentContainer>
      ))}

      <Pagination
        dataLength={post.length}
        perData={perData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </AllContainer>
  );
};

export default CommentPost;

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 154px;
`;

const CommentContainer = styled.div`
  width: 971px;
  height: 160px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #9819c3;
  margin-bottom: 20px;
  margin-left: 29px;
  cursor: pointer;
`;

const ContentsContainer = styled.div`
  padding: 0 39px 0 50px;
`;

const CommentTitle = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 13px;
  margin-top: 29px;
`;

const PhotoandTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const CommentContents = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
`;

const IconContainer = styled.div`
  margin-top: 20px;
`