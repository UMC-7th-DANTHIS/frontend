import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MypageGenre from '../MypageGenre';
import api from '../../../../api/api';
import ImagesUploader from '../../../registration/components/ImagesUploader';

const ProfileDancer = () => {
  const [formState, setFormState] = useState({
    name: '',
    instagram: '',
    chatting: '',
    introduce: '',
    genre: [],
    record: '',
    dancerImages: ["", "", ""],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/dancers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data)
        console.log(response.data.data.dancerImages)
        const data = response.data.data;

        setFormState({
          name: data.dancerName || '',
          instagram: data.instargramId || '',
          chatting: data.openChatUrl || '',
          introduce: data.bio || '',
          genre: data.preferredGenres || [],
          record: data.history || '',
          dancerImages: data.dancerImages || [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const updatedData = {
        dancerName: formState.name,
        instargramId: formState.instagram,
        openChatUrl: formState.chatting,
        bio: formState.introduce,
        preferredGenres: formState.genre,
        history: formState.record,
        dancerImages: formState.dancerImages,
      };

      const response = await api.put('/dancers', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('업데이트 성공');
        console.log(updatedData);
      } else {
        console.error('업데이트 에러 발생');
      }
    } catch (error) {
      console.error('업데이트 에러', error);
    }
  };

  const getPreview = (images) => {
    if (!images || images.length === 0) return null;

    return images.map((image) => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }
      return image;
    });
  };

  return (
    <AllContainer>
      <Container>
        <ItemContainer>
          <DancerNameContainer>
            <Label> 댄서 네임 </Label>
            <Input type="text" placeholder="댄서 네임을 입력하세요" value={formState.name} onChange={(e) => handleFormChange('name', e.target.value)} />
          </DancerNameContainer>

          <InstaContainer>
            <Label> Instagram 아이디 </Label>
            <Input type="text" placeholder="Instagram 아이디를 입력하세요" value={formState.instagram} onChange={(e) => handleFormChange('instagram', e.target.value)} />
          </InstaContainer>

          <OpenChatContainer>
            <OpenChatItemContainer>
              <Label> 오픈채팅방 링크 </Label>
              <Text> *유저들과의 채팅이 이루어질 오픈채팅방 링크를 입력해주세요 </Text>
            </OpenChatItemContainer>
            <Input type="link" placeholder="카카오톡 오픈채팅방 링크를 입력하세요" value={formState.chatting} onChange={(e) => handleFormChange('chatting', e.target.value)} />
          </OpenChatContainer>

          <IntroContainer>
            <Label> 한마디 소개글 </Label>
            <Input type="text" placeholder="한 마디 소개글을 입력하세요" value={formState.introduce} onChange={(e) => handleFormChange('introduce', e.target.value)} />
          </IntroContainer>

          <GenreContainer>
            <OpenChatItemContainer>
              <Label> 장르 </Label>
              <Text> * 최대 2개까지 선택 가능합니다 </Text>
            </OpenChatItemContainer>
            <MypageGenre
              genreSelect={2}
              selectedGenres={formState.genre}
              onGenreChange={(selectedGenres) => {
                handleFormChange('genre', selectedGenres);
              }}
            />
          </GenreContainer>

          <DancerRecord>
            <Label> 댄서 이력 </Label>
            <WriteInput type="text" placeholder="댄서 이력을 입력하세요" value={formState.record} onChange={(e) => handleFormChange('record', e.target.value)} />
          </DancerRecord>

          <DancerPictureContainer>
            <OpenChatItemContainer>
              <Label> 댄서 사진 </Label>
              <SmallTextContainer>
                <SmallText>* 최대 3장까지 등록 가능합니다</SmallText>
                <SmallText>* 가장 첫 번째로 등록된 사진이 프로필로 사용됩니다</SmallText>
              </SmallTextContainer>
            </OpenChatItemContainer>
            <ImagesUploader
              isFor="dancer"
              images={getPreview(formState.dancerImages)}
              handleFormChange={handleFormChange}
            />
          </DancerPictureContainer>

        </ItemContainer>
      </Container>
      <SaveButton onClick={handleSubmit}> 프로필 저장 </SaveButton>
    </AllContainer>
  );
};

export default ProfileDancer;

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  width: 900px;
  height: 1800px;
  flex-shrink: 0;
  border-radius: 25px;
  border: 2px solid #9819C3;
  display: flex;
  justify-content: center;
  padding-bottom: 56px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DancerNameContainer = styled.div`
  margin-top: 58px;
`;

const Label = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
`;

const Input = styled.input`
  display: flex;
  width: 588px;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #000;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  padding-left: 31px;

  &::placeholder {
    color: #DDD;
    font-size: 20px;
    font-weight: 300;
    line-height: normal;
    font-style: normal;
  }
`;

const InstaContainer = styled.div`
  margin-top: 27px;
`;

const OpenChatContainer = styled.div`
  margin-top: 27px;
`;

const OpenChatItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  color: #B2B2B2;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 20px;
  margin-top: 7px;
`;

const IntroContainer = styled.div`
  margin-top: 44px;
`;

const GenreContainer = styled.div`
  margin-top: 44px;
`;

const DancerRecord = styled.div`
  margin-top: 59px;
  display: flex;
  flex-direction: column;
`;

const WriteInput = styled.textarea`
  display: flex;
  width: 588px;
  height: 466px;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  background-color: transparent;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  margin-top: 10px;
  resize: none; 
  padding: 17px 16px 0 18px;

  &::placeholder {
    color: #DDD;
    font-size: 20px;
    font-weight: 300;
    line-height: normal;
    font-style: normal;
  }
`;

const DancerPictureContainer = styled.div`
  margin-top: 45px;
`;

const SmallTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallText = styled.div`
  color: #B2B2B2;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-left: 20px;
`;

const SaveButton = styled.button`
  width: 300px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #9819C3;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 45px;
  margin-bottom: 92px;
  cursor: pointer;
`;
