import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import useFetchList from '../hooks/useFetchList';

const CommunityLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [forceReload, setForceReload] = useState(false);

  const perData = 10;

  const {
    data: lists,
    isLoading,
    isError
  } = useFetchList(null, null, currentPage, forceReload);

  return (
    <>
      <Outlet
        context={{
          lists: lists?.data,
          perData,
          currentPage,
          setCurrentPage,
          setForceReload
        }}
      />
    </>
  );
};

export default CommunityLayout;
