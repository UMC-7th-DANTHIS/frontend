import React from 'react';
import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../../assets/buttons/starlevel_nonfilled.svg';

const Level = ({ level }) => {
  const totalStars = 5;

  return (
    <LevelContainer>
      <Text>난이도 : </Text>
      <StarsWrapper>
        {Array.from({ length: totalStars }, (_, index) =>
          index < level ? (
            <StarFilled key={index} />
          ) : (
            <StarNonfilled key={index} />
          )
        )}
      </StarsWrapper>
    </LevelContainer>
  );
};

export default Level;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Text = styled.div`
  margin: 3px 0;
  color: var(--main_white, #fff);
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 178.571% */
  letter-spacing: -1.4px;
`;
const StarsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;
