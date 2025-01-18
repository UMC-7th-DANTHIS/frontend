import React from 'react'
import styled from 'styled-components'
import ClassPic from '../../../assets/dummyphoto/class.svg'

const ClassTab=() => {
    const data = [
        {id:1, img:ClassPic },
        {id:2, img:ClassPic },
        {id:3, img:ClassPic },
        {id:4, img:ClassPic },
        {id:5, img:ClassPic },
        {id:6, img:ClassPic },
    ];

  return (
    <Layout>
        <ClassContainer>
            {data.map((item) =>(
                <Class key = {item.id}>
                    <ClassImg src={item.img} />
                </Class>
            ))}

        </ClassContainer>

    </Layout>
  )
}

export default ClassTab;

const Layout = styled.div`
display : flex;
margin-top : 100px;
justify-content : center;
padding-bottom : 442px;

`

const ClassContainer=styled.div`
display : grid;
grid-template-columns : repeat(3,1fr);
gap : 56px;
`
const Class = styled.div`
margin-bottom : 24px;
`
const ClassImg = styled.img`
width: 300px;
height: 300px;
flex-shrink: 0;
`