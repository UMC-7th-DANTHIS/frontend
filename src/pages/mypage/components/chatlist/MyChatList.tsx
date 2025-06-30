import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../../../assets/arrow.svg';
import Pagination from '../../../../common/Pagination';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import api from '../../../../api/api';

interface Chat {
  dancerId: number;
  dancerName: string;
  profileImage?: string;
}

interface FetchUserChatResponse {
  chats: Chat[];
  totalDancers: number;
}

const fetchUserChat = async (
  currentPage: number,
  perData: number
): Promise<FetchUserChatResponse> => {
  const token = localStorage.getItem('token');
  const response = await api.get('/chats/user', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      page: currentPage,
      size: perData
    }
  });
  return {
    chats: response.data.data.chatList || [],
    totalDancers: response.data.data.totalDancers || 0
  };
};

const MyChatList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perData = 5;

  const { data, isLoading, isError, error } = useQuery<
    FetchUserChatResponse,
    Error
  >({
    queryKey: ['userchat', currentPage, perData],
    queryFn: () => fetchUserChat(currentPage, perData)
  });

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <ChatContainer>
        {data?.chats?.length ? (
          data.chats.map((chat) => (
            <ChatList key={chat.dancerId}>
              <ListItem>
                <ListImage src={chat.profileImage || ''} alt="Profile" />
                <ListName>{chat.dancerName}</ListName>
                <ArrowContainer>
                  <Arrow />
                </ArrowContainer>
              </ListItem>
            </ChatList>
          ))
        ) : (
          <Text>채팅 내역이 없습니다.</Text>
        )}
      </ChatContainer>

      {data?.totalDancers ? (
        <PaginationContainer>
          <Pagination
            dataLength={data.totalDancers}
            perData={perData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </PaginationContainer>
      ) : null}
    </>
  );
};

export default MyChatList;

const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  margin-top: 25px;
`;

const ChatList = styled.div`
  color: white;
  width: 600px;
  height: 80px;
  flex-shrink: 0;
  border: 1px solid #9819c3;
  background-color: black;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 2px #9819c3;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 33px;
  background-color: gray;
  border-radius: 6px;
`;

const ListName = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  letter-spacing: -1.4px;
  margin-left: 22px;
`;

const ArrowContainer = styled.div`
  margin-left: auto;
  margin-right: 25px;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

const Text = styled.div`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 100px;
  margin-top: 219px;
`;
