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
  const [currentComponent, setCurrentComponent] = useState<'detail' | 'list'>(
    'detail'
  );
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
      const response = await api.get(`dance-classes/${classId}`, {
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

  if (classDataLoading) return <LoadingSpinner isLoading={classDataLoading} />;
  if (classDataError) return <div>Error: {(error as Error).message}</div>;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleAddOverlay = () => setShowRegisterUser(true);
  const hideAddOverlay = () => setShowRegisterUser(false);
  const handleGoBack = () => navigate(-1);
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
                <Image src={classData.dancer?.profileImage} />
              </ImageContainer>

              <ReviewSection>
                <IconContainer>
                  <IconText> 유저 추가 </IconText>
                  <PlusButton
                    width={16}
                    height={16}
                    onClick={handleAddOverlay}
                  />
                  {showRegisterUser && classId && (
                    <UserOverlay onclose={hideAddOverlay} classId={classId} />
                  )}
                </IconContainer>

                <AddIconContainer>
                  <TextContainer>
                    <MainText>
                      수업을 수강한 유저를 추가하고 리뷰를 받아보세요!
                    </MainText>
                    <SubText>
                      *강사가 수업을 수강했음을 증명한 유저만 해당 수업에 대한
                      리뷰를 남길 수 있습니다
                    </SubText>
                    <SubText>
                      *무분별한 리뷰 작성을 막기 위해 한 번 추가한 유저는 운영진
                      문의를 통해서만 삭제할 수 있습니다
                    </SubText>
                  </TextContainer>
                  <AskContainer
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Ask />
                    {isHovered && <AskAlert />}
                  </AskContainer>
                </AddIconContainer>
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
                  <NoText>예약된 유저가 없습니다.</NoText>
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
      ) : (
        <MyRegisterClass />
      )}
    </>
  );
};

export default MyRegisterDetail;

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
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
`;

const ContentSection = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 35px;
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
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
  gap: 10px;
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
  margin-top: 36px;
  display: inline-flex;
  width: 82px;
  height: 19px;
  padding: 6px 12px;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  border-radius: 37px;
  border: 1px solid #9819c3;
  cursor: pointer;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddIconContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const AskContainer = styled.div`
  position: relative;
  margin-top: 43px;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
const MainText = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubText = styled.div`
  color: #b2b2b2;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Divider = styled.div`
  height: 1px;
  width: 898px;
  background-color: #ddd;
  margin-top: 41px;
  margin-bottom: 29px;
`;

const CheckUserContainer = styled.div`
  margin-left: 35px;
`;

const UserImage = styled.div`
  margin-top: 29px;
`;

const ImageList = styled.div`
  margin-left: 19px;
  display: flex;
  flex-direction: row;
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  margin-bottom: 37px;
`;

const UserName = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
  margin-left: 22px;
  margin-top: 13px;
`;
const PaginationContainer = styled.div`
  margin-bottom: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
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
`;

const NoText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
  text-align: center;
`;
