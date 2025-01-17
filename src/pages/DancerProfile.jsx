import React from 'react'
import styled from 'styled-components'
import CircleIcon from '../assets/shape/circle.svg'

const DancerProfile = () => {
  return (
    <Layout>
      <TopContainer>
        <NameContainer>
          <Circle src={CircleIcon} />
          <Name>Parana</Name>
        </NameContainer>
        <ProfileContainer>

        </ProfileContainer>
      </TopContainer>
        
    </Layout>
  )
}

export default DancerProfile;

const Layout = styled.div`
`

const TopContainer = styled.div`
`
const NameContainer = styled.div`
`
const ProfileContainer = styled.div`
`

const Circle = styled.img``

const Name = styled.div`
`