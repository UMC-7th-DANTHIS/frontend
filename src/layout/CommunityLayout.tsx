import styled from 'styled-components';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useFetchList } from '../hooks/useFetchList';

const CommunityLayout = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [forceReload, setForceReload] = useState<boolean>(false);

  const perData: number = 10;

  const { data: lists } = useFetchList(currentPage, forceReload);

  return (
    <Container>
      <Outlet
        context={{
          lists,
          perData,
          currentPage,
          setCurrentPage,
          setForceReload
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
`;

export default CommunityLayout;
