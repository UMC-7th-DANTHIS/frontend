import React from 'react'
import styled from 'styled-components'
import DancerBoard from './components/DancerBoard'

const ProfileList=()=> {
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