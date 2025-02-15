import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import CommunityPost from '../store/community/CommunityPost';
import useFetchList from '../hooks/useFetchList';

const CommunityLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 10;

  const {
    data: lists,
    isLoading,
    isError
  } = useFetchList(null, null, currentPage);

  return (
    <>
      <Outlet
        context={{
          lists: lists?.data,
          perData,
          currentPage,
          setCurrentPage
        }}
      />
    </>
  );
};

export default CommunityLayout;
