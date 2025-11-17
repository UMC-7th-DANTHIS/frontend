import styled from 'styled-components';

export const SubmitButton = ({ text }: { text: string }) => {
  return (
    <Button type="submit">
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

  &:hover {
    cursor: pointer;
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
