import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useFetchList } from '@/hooks/useFetchList';
import { PostListResponse } from '../types/CommunityInterface';

const CommunityLayout = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [forceReload, setForceReload] = useState<boolean>(false);

  const perData: number = 10;

  const { data: lists } = useFetchList<PostListResponse>(
    currentPage,
    forceReload
  );

  return (
    <>
      <Outlet
        context={{
          lists,
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
