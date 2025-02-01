import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import CommunityPost from '../store/community/CommunityPost';

const CommunityLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perData = 10;
  const filteredList = CommunityPost.slice(
    perData * (currentPage - 1),
    perData * currentPage
  );

  return (
    <>
      <Outlet
        context={{
          filteredList,
          perData,
          currentPage,
          setCurrentPage,
          CommunityPost
        }}
      />
    </>
  );
};

export default CommunityLayout;
