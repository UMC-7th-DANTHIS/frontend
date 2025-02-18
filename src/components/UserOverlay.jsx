import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SampleImage from '../assets/image.png';
import { ReactComponent as PlusButton } from '../assets/buttons/plus-button.svg';
import api from '../api/api';
import { useQuery } from '@tanstack/react-query';

const UserOverlay = ({ onclose, classId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const fetchEligibleUsers = async (currentPage, perData, classId) => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/dance-classes/${classId}/eligible-users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: currentPage,
        size: perData
      }
    });

    return {
      users: response.data.data.users || [],
      totalElements: response.data.data.totalUsers || 0,
    };
  };

  const { data: eligibleUsers, isLoading, isError } = useQuery({
    queryKey: ['eligibleUsers', classId, currentPage, perData],
    queryFn: () => fetchEligibleUsers(currentPage, perData, classId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handlePlusButtonClick = async (userId, currentApprovalStatus) => {
    if (currentApprovalStatus) return;

    const token = localStorage.getItem('token');
    const newApprovalStatus = !currentApprovalStatus;

    try {
      const response = await api.post(
        `/dance-classes/${classId}/bookings/${userId}`,
        { isApproved: newApprovalStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {

        console.log('Booking updated:', response.data);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };


  const sortedUsers = [...eligibleUsers.users].sort((a, b) => {
    return a.isApproved === b.isApproved ? 0 : a.isApproved ? 1 : -1;
  });

  return (
    <Container>
      <AllContainer onClick={onclose}>
        <ScrollableContainer>
          <ImageContainer totalUsers={eligibleUsers?.totalElements}>
            {sortedUsers.map((user, id) => (
              <ImageList key={user.userId}>
                <ListImage
                  src={user.profileImage[0] || SampleImage}
                  alt={'userImage'}
                />
                <UserName
                  isApproved={user.isApproved}
                >
                  {user.nickname}
                </UserName>
                <Icon
                  isApproved={user.isApproved}
                  onClick={() => handlePlusButtonClick(user.userId, user.isApproved)}
                  disabled={user.isApproved}
                >
                  <PlusButton width={40} height={40} />
                </Icon>
              </ImageList>
            ))}
          </ImageContainer>
        </ScrollableContainer>
      </AllContainer>
    </Container>
  );
};

export default UserOverlay;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ScrollableContainer = styled.div`
  max-height: 485px;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #D9D9D9;
    border-radius: 11px;
    border: 6px solid #D9D9D9;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 39px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 36px 56px;
`;

const AllContainer = styled.div`
  width: 528px;
  height: 494px;
  border-radius: 15px;
  border: 1px solid #a60f62;
  background: #000;
  display: flex;
  flex-direction: column;
`;

const ImageList = styled.div`
  display: flex;
  align-items: center;
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
`;

const UserName = styled.div`
  font-size: 20px;
  color: ${({ isApproved }) =>
    isApproved ? '#4D4D4D' : '#fff'};
  margin-left: 22px;
  font-weight: 600;
  line-height: 1.5;
`;

const Icon = styled.div`
  margin-left: auto;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;

  svg rect {
    stroke: ${({ isApproved, disabled }) =>
    disabled
      ? '#4D4D4D'
      : isApproved
        ? '#4D4D4D'
        : '#9819C3'};
  }

  svg path {
    fill: ${({ isApproved, disabled }) =>
    disabled
      ? '#4D4D4D'
      : isApproved
        ? '#4D4D4D'
        : '#9819C3'};
  }
`;
