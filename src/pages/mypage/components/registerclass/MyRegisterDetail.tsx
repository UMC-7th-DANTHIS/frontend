import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FocusedCircle } from '../../../../assets/shape/focusedcircle.svg';
import sampleImage from '../../../../assets/errorImage.svg';
import { ReactComponent as PlusButton } from '../../../../assets/buttons/plus-button.svg';
import { ReactComponent as Ask } from '../../../../assets/buttons/ask.svg';
import AskAlert from '../../../../components/AskAlert';
import UserOverlay from '../../../../components/UserOverlay';
import Pagination from '../../../../components/Pagination';
import MyRegisterClass from './MyRegisterClass';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api/api';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import {
  BookingUserResponse,
  RegisterDetailProps
} from '@/types/mypage/RegisterType';

const MyRegisterDetail = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRegisterUser, setShowRegisterUser] = useState(false);
  const [currentComponent] = useState<'detail' | 'list'>('detail');
  const { classId } = useParams<{ classId: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 5;
  const navigate = useNavigate();

  const {
    data: classData,
    isLoading: classDataLoading,
    isError: classDataError,
    error
  } = useQuery<RegisterDetailProps>({
    queryKey: ['classDetails', classId],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get(`dance-classes/${classId}/booking-users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data.data;
    },
    enabled: !!classId
  });

  const fetchClassDetails = async (
    currentPage: number,
    perData: number
  ): Promise<BookingUserResponse> => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/dance-classes/${classId}/booking-users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: currentPage,
        size: perData
      }
    });

    return {
      users: response.data.data.users || [],
      totalElements: response.data.data.totalUsers || 0
    };
  };

  const { data: bookingUser } = useQuery<BookingUserResponse>({
    queryKey: ['bookingUser', classId, currentPage, perData],
    queryFn: () => fetchClassDetails(currentPage, perData),
    enabled: !!classId
  });

  // 댄서 여부 확인
  const { data: isDancer } = useQuery({
    queryKey: ['isDancer'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/users/dancer-admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    }
  });

  // 댄서인 경우 dancerId 가져오기
  const { data: dancerData } = useQuery({
    queryKey: ['myDancer'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/dancers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    },
    enabled: isDancer === true
  });

  if (classDataLoading) return <LoadingSpinner isLoading={classDataLoading} />;
  if (classDataError) return <div>Error: {(error as Error).message}</div>;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleAddOverlay = () => setShowRegisterUser(true);
  const hideAddOverlay = () => setShowRegisterUser(false);
  const handleGoBack = () => navigate('/mypage?menu=myregisteredclasses');
  const users = bookingUser?.users ?? [];

  return (
    <>
      {currentComponent === 'detail' && classData ? (
        <ClassContainer>
          <ItemContainer>
            <HeaderContainer>
              <IconWrapper>
                <FocusedCircle width={20} height={20} />
              </IconWrapper>
              <Label>{classData.className}</Label>
            </HeaderContainer>

            <ContentSection>
              <ImageContainer>
                <Image src={classData.classImage} />
              </ImageContainer>

              <ReviewSection>
                <TextContainer>
                  <ActionsRow>
                    <IconContainer onClick={handleAddOverlay}>
                      <IconText> 유저 추가 </IconText>
                      <PlusButton width={16} height={16} />
                    </IconContainer>
                    <AskInActionsRow
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Ask />
                      {isHovered && <AskAlert />}
                    </AskInActionsRow>
                  </ActionsRow>
                  <MainText>
                    수업을 수강한 유저를 추가하고 리뷰를 받아보세요!
                  </MainText>
                  <SubTextBlock>
                    <SubText>
                      강사가 수업을 수강했음을 증명한 유저만 해당 수업에 대한
                      리뷰를 남길 수 있습니다.
                    </SubText>
                    <SubTextAskRow>
                      <SubText>
                        무분별한 리뷰 삭제를 막기 위해 한 번 추가한 유저는 운영진
                        문의를 통해서만 삭제할 수 있습니다.
                      </SubText>
                      <AskInSubTextRow
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Ask />
                        {isHovered && <AskAlert />}
                      </AskInSubTextRow>
                    </SubTextAskRow>
                  </SubTextBlock>
                </TextContainer>
           
                {showRegisterUser && classId && (
                  <UserOverlay onclose={hideAddOverlay} classId={classId} />
                )}
              </ReviewSection>
            </ContentSection>

            <Divider />

            <CheckUserContainer>
              <Label> 이 수업을 수강한 유저 </Label>
              <UserImage>
                {users.length > 0 ? (
                  users.map((booking) => (
                    <ImageList key={booking.userId}>
                      <ListImage
                        src={booking.profileImage || sampleImage}
                        alt="userImage"
                      />
                      <UserName>{booking.nickname}</UserName>
                    </ImageList>
                  ))
                ) : (
                  <NoText>수강한 유저가 없습니다.</NoText>
                )}
              </UserImage>
            </CheckUserContainer>

            <PaginationContainer>
              <Pagination
                dataLength={bookingUser?.totalElements || 0}
                perData={perData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </PaginationContainer>

            <GoBack onClick={handleGoBack}>수업 목록으로</GoBack>
          </ItemContainer>
        </ClassContainer>
      ) : dancerData?.id ? (
        <MyRegisterClass dancerId={dancerData.id} dancerInfo={dancerData} />
      ) : null}
    </>
  );
};

export default MyRegisterDetail;

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    padding: 0 12px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 898px;
    box-sizing: border-box;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  gap: 37px;
  margin-left: 35px;
  margin-top: 26px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    margin-left: 20px;
    gap: 12px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    gap: 10px;
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 600px) {
    width: 160px;
    height: 160px;
    flex-shrink: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: white;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 44px;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 0;
  }
`;


const ActionsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 2px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const IconText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const IconContainer = styled.div`
  display: inline-flex;
  width: 106px;
  min-width: 106px;
  max-width: 106px;
  height: 31px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border-radius: 37px;
  border: 1px solid #9819c3;
  cursor: pointer;
  box-sizing: border-box;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-wrap: break-word;
    word-break: break-word;
    gap: 0;


    & > *:nth-child(1) {
      order: 3;
    }
    & > *:nth-child(2) {
      order: 1;
    }
    & > *:nth-child(3) {
      order: 2;
    }
  }
`;

const AskContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const AskInSubTextRow = styled(AskContainer)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const AskInActionsRow = styled(AskContainer)`
  @media (min-width: 769px) {
    display: none;
  }
`;
const MainText = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 14px;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
`;

const SubText = styled.div`
  color: #b2b2b2;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 15px;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

const SubTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (min-width: 769px) {
    position: relative;
    padding-left: 4px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 42px;
      background-color: #b2b2b2;
    }
  }

  @media (max-width: 768px) {
    padding-left: 0;
    margin-bottom: 14px;
  }
`;

const SubTextAskRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 25px;
  min-width: 0;

  ${SubText} {
    flex: 1;
    min-width: 0;

    @media (max-width: 768px) {
      margin-top: 4px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 898px;
  background-color: #ddd;
  margin-top: 41px;
  margin-bottom: 29px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 898px;
    margin-top: 28px;
    margin-bottom: 24px;
  }

  @media (max-width: 600px) {
    margin-top: 20px;
    margin-bottom: 16px;
  }
`;

const CheckUserContainer = styled.div`
  margin-left: 35px;

  @media (max-width: 768px) {
    margin-left: 20px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
  }
`;

const UserImage = styled.div`
  margin-top: 29px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

const ImageList = styled.div`
  margin-left: 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 37px;

  @media (max-width: 768px) {
    margin-bottom: 28px;
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-bottom: 12px;
  }
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
  }
`;

const UserName = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1px;
  margin-left: 22px;
  margin-top: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 16px;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    margin-left: 12px;
  }
`;
const PaginationContainer = styled.div`
  margin-bottom: 32px;
  align-items: center;
  justify-content: center;
  display: flex;

  @media (max-width: 600px) {
    margin-bottom: 24px;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
  }
`;

const GoBack = styled.button`
  margin-bottom: 193px;
  width: 100px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #bf00ff;
  background: transparent;
  color: #bf00ff;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 120px;
  }

  @media (max-width: 600px) {
    margin-bottom: 60px;
  }
`;

const NoText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
