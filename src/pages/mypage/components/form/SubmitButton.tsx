import styled from 'styled-components';

export const SubmitButton = ({
  text,
  disabled = false
}: {
  text: string;
  disabled?: boolean;
}) => {
  return (
    <Button type="submit" disabled={disabled}>
      <span>{text}</span>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  padding: 12px 0;
  flex-shrink: 0;
  border: none;
  border-radius: 15px;
  background: var(--main-purple);

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    background: #B2B2B2;
    cursor: not-allowed;
    color: #FFFFFF
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 14px 0;
  }

  span {
    color: var(--main-white);
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;

    ${({ theme }) => theme.media.tablet} {
      font-size: 20px;
    }
  }
`;
