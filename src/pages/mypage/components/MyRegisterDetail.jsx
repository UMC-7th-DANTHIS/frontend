import React from 'react'
import styled from 'styled-components'
import { ReactComponent as FocusedCircle } from "../../../assets/shape/focusedcircle.svg"
import SampleImage from '../../../assets/image.png'
import { ReactComponent as PlusButton } from "../../../assets/buttons/plus-button.svg"


const MyRegisterDetail = () => {
  return (
    <ClassContainer>
      <ItemContainer>
        <HeaderContainer>
          <IconWrapper>
            <FocusedCircle width={20} height={20} />
          </IconWrapper>
          <Label>Parana 걸스힙합 클래스</Label>
        </HeaderContainer>

        <ContentSection>
          <ImageContainer>
            <Image src={SampleImage} />
          </ImageContainer>

          <ReviewSection>
            <IconContainer>
              <IconText> 유저 추가 </IconText>
              <PlusButton width={16} height={16} />
            </IconContainer>

            <TextContainer>
              <MainText>수업을 수강한 유저를 추가하고 리뷰를 받아보세요!</MainText>
              <SubText>*강사가 수업을 수강했음을 증명한 유저만 해당 수업에 대한 리뷰를 남길 수 있습니다</SubText>
              <SubText>*무분별한 리뷰 작성을 막기 위해 한 번 추가한 유저는 운영진 문의를 통해서만 삭제할 수 있습니다</SubText>
            </TextContainer>
          </ReviewSection>
        </ContentSection>

        <Divider />

        <CheckUserContainer>
          <Label> 이 수업을 수강한 유저 </Label>
          <UserImage>
            {Array.from({ length: 5 }).map((_, index) => (
              <ImageList key={index}>
                <ListImage src={SampleImage} alt={`Class ${index + 1}`} />
                <UserName> 써니 </UserName>
              </ImageList>
            ))}
          </UserImage>
        </CheckUserContainer>

      </ItemContainer>
    </ClassContainer>
  );
};

{/* <Noregister>
<Text> 내가 등록한 수업이 존재하지 않습니다. </Text>
<Button> 댄스 수업 등록하러 가기 </Button>
</Noregister>
<NoDancer>
<Text> 댄서로 등록된 사용자에게 열리는 서비스입니다. </Text>
</NoDancer> */}


export default MyRegisterDetail;

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;


const Label = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.2px;
`;

const ContentSection = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 35px;
`;

const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IconText = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
`

const IconContainer = styled.div`
  margin-top: 36px;
  display: inline-flex;
  width: 82px;
  height: 19px;
  padding: 6px 12px;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  border-radius: 37px;
  border: 1px solid #9819C3;
  cursor: pointer;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  color: #FFF;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubText = styled.div`
  color:  #B2B2B2;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Divider = styled.div`
  height: 1px;
  width: 898px;
  background-color: #DDD;
  margin-top: 41px;
  margin-bottom: 29px;
`;

const CheckUserContainer = styled.div`
  margin-left: 35px;
`

const UserImage = styled.div`
  margin-top: 29px;
`

const ImageList = styled.div`
  margin-left: 19px;
  display: flex;
  flex-direction: row;
`

const ListImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  margin-bottom: 50px;
`

const UserName = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1px;
  margin-left: 22px;
  margin-top: 13px;
`

//
const NoDancer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 249px;
`

const Text = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`

const Noregister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 231px;
`

const Button = styled.button`
  width: 474px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #9819C3;
  color: white;
  border: 1px solid #9819C3;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-top: 27px;
  cursor: pointer;
`