import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from "../../../../assets/arrow.svg"
import sampleImage from '../../../../assets/image.png'
import Pagination from '../../../../components/Pagination'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import api from '../../../../api/api'

const fetchUserChat = async (currentPage, perData) => {
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
  console.log(response.data.data.chatList);
  console.log(response.data.data.totalDancers);
  return {
    chats: response.data.data.chatList || [],
    totalDancers: response.data.data.totalDancers || 0
  };
};

const MyChatList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userchat', currentPage, perData],
    queryFn: () => fetchUserChat(currentPage, perData)
  });

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['userchat'],
  //   queryFn: async () => {
  //     const token = localStorage.getItem('token');
  //     const response = await api.get('/chats/user', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data.data.chatList || [];
  //   },
  // });

  // const filteredList = data ? data.slice(perData * (currentPage - 1), perData * currentPage) : [];

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
                <ListImage src={chat.profileImage || sampleImage} alt="Profile" />
                <ListName> {chat.dancerName} </ListName>
                <ArrowContainer>
                  <Arrow />
                </ArrowContainer>
              </ListItem>
            </ChatList>
          ))
        ) : (
          <Text> 채팅 내역이 없습니다. </Text>
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
  )
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
  border: 1px solid #9819C3;
  background-color: black;
  border-radius: 20px;
  box-shadow: 0px 0px 5px 2px #9819C3;
`

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 33px;
  background-color: gray;
  border-radius: 6px;
`

const ListName = styled.div`
  font-size: 28px;
  color: #fff;
  font-weight: 600;
  letter-spacing: -1.4px;
  margin-left: 22px;
`

const ArrowContainer = styled.div`
  margin-left: auto;
  margin-right: 25px;
  cursor: pointer;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
`;

const Text = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 100px;
  margin-top: 219px;
`