import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from "../../../../assets/arrow.svg"
import sampleImage from '../../../../assets/image.png'
import Pagination from '../../../../components/Pagination'
import dummyChat from '../../../../store/mypage/dummyChat'


const MyChatList = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const perData = 6;
  // const filteredList = data.slice(
  //   perData * (currentPage - 1),
  //   perData * currentPage
  // );

  const data = dummyChat;

  return (
    <>
      <ChatContainer>
        {data.map((chat) => (
          <ChatList key={chat.id}>
            <ListItem>
              <ListImage src={chat.images[0] || sampleImage} alt="Profile" />
              <ListName> {chat.username} </ListName>
              <ArrowContainer>
                <Arrow />
              </ArrowContainer>

            </ListItem>

          </ChatList>
        ))}
      </ChatContainer>
      {/* <PaginationContainer>
        <Pagination dataLength={data.length} perData={perData} currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </PaginationContainer> */}
    </>


  )
}

export default MyChatList

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
  margin-bottom: 256px;
  margin-left: 60px;
`