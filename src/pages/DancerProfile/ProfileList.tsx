import React from 'react';
import styled from 'styled-components';
import DancerBoard from '../../common/DancerProfile/DancerBoard';

const ProfileList : React.FC=()=> {
  return (
    <Layout>
      <DancerBoard />
    </Layout>
  )
}

export default ProfileList;

const Layout = styled.div`
display: flex;
`