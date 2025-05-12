import styled from 'styled-components';
import { ReactComponent as StarFilled } from '../../../assets/buttons/starlevel_filled.svg';
import { ReactComponent as StarNonfilled } from '../../../assets/buttons/starlevel_nonfilled.svg';
import { StarRatingProps } from '../../../types/RegisterFormInterface';

const StarRating = ({ value, handleFormChange }: StarRatingProps) => {
  const totalStars = 5;

  const handleSelect = (index: number) => {
    // 클릭한 별이 현재 level과 같으면 선택 해제,
    // 아니면 선택
    const newValue = index + 1 === value ? index : index + 1;
    handleFormChange('difficulty', newValue);
  };

  return (
    <StarsContainer>
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < value; // value == 2 이면 index 0, 1이 true

        return (
          <StarBtn key={index} onClick={() => handleSelect(index)}>
            {isFilled ? <StarFilled /> : <StarNonfilled />}
          </StarBtn>
        );
      })}
    </StarsContainer>
  );
};

export default StarRating;

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 588px;
  margin: 9px 0 28px 8px;
`;
const StarBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
