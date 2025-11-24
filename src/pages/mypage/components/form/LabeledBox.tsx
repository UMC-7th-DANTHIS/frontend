import styled from 'styled-components';
import { PropsWithChildren } from 'react';

interface LabeledBoxProps {
  isLong?: boolean;
  label: string;
  notice?: string;
}

export const LabeledBox = ({ isLong = false, label, notice, children }: PropsWithChildren<LabeledBoxProps>) => {
  return (
    <Container>
      <Label $long={isLong}>
        <span>{label}</span>
        {notice && <Notice>{notice}</Notice>}
      </Label>
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const Label = styled.div<{ $long?: boolean }>`
  display: flex;
  flex-direction: ${({ $long }) => ($long ? 'column' : 'row')};
  align-items: ${({ $long }) => ($long ? 'flex-start' : 'center')};
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;

  span {
    color: var(--main-white);
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;

    ${({ theme }) => theme.media.tablet} {
      font-size: 20px;

      span {
        margin-left: 8px;
      }
    }
  }

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    justify-content: flex-start;
    align-items: ${({ $long }) => ($long ? 'start' : 'center')};
  }
`;
const Notice = styled.p`
  margin-top: 10px;
  margin-bottom: 1px;
  color: var(--text-secondary-gray);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 300;
  white-space: pre-line;

  ${({ theme }) => theme.media.tablet} {
    margin-top: 0;
    margin-left: 20px;
    font-size: 14px;
  }

  ${({ theme }) => theme.media.desktop} {
    white-space: nowrap;
  }
`;
