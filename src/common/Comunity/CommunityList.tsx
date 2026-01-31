import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import formatDate from '../../api/formatDate';

import ImageDescript from '../../assets/Search/imageDescript.svg';
import CommentPhoto from '../../assets/Community/CommentPhoto.svg';

import { PostPreview } from '@/types/CommunityInterface';

type CommunityListProps = {
  list: PostPreview;
};

const CommunityList = ({ list }: CommunityListProps) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/community/${id}`);
  };

  return (
    <ListContainer>
      <NoList>{list?.postId}</NoList>
      <TextContainer>
        {list.hasPhoto ? (
          <ImageYes src={ImageDescript} alt={'그림있으요'} />
        ) : (
          <ImageNo />
        )}
        <TitleList onClick={() => handleNavigate(list.postId!)}>
          <TitleText>
            <Title>{list?.title}</Title>
            {list?.commentCount! > 0 ? (
              <ViewWrapper>
                <ViewDescript src={CommentPhoto} alt={'댓글있으요'} />
                <ViewPeople>{list?.commentCount}</ViewPeople>
              </ViewWrapper>
            ) : (
              ''
            )}
          </TitleText>
        </TitleList>
      </TextContainer>
      <DateList>
        <DateList>{formatDate(list?.createdAt!, 3)}</DateList>
      </DateList>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: 16px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: white;
  width: 100%;
  min-width: 0;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }

  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  width: 75%;
  justify-content: start;
  align-items: center;
  min-width: 0;
`;

const NoList = styled.span`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`;

const ImageYes = styled.img`
  display: inline-block;
  width: 12px;
  height: 12px;

  ${({ theme }) => theme.media.tablet} {
    width: 16px;
    height: 16px;
  }
  flex-shrink: 0;
`;

const ImageNo = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  background-color: transparent;
`;

const TitleList = styled.button`
  display: flex;
  margin-left: 5px;
  align-items: center;
  text-align: start;
  border: 0;
  background-color: transparent;
  color: white;
  font-size: 12px;

  flex: 1 1 auto;
  min-width: 0;

  ${({ theme }) => theme.media.tablet} {
    font-size: 16px;
  }
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const TitleText = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: 8px;
`;

const Title = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  flex: 0 1 auto;
  min-width: 0;
`;

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 0 auto;
`;

const ViewDescript = styled.img`
  display: inline-flex;
  justify-content: center;
  margin-left: 10px;
  width: 12px;
  height: 12px;

  ${({ theme }) => theme.media.tablet} {
    width: 16px;
    height: 16px;
  }
`;

const ViewPeople = styled.div`
  display: inline-flex;
  color: #ddd;
  margin-left: 5px;

  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const DateList = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

export default CommunityList;
