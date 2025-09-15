import { ReactNode } from 'react';
import styled from 'styled-components';

interface DetailSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const DetailSection = ({ title, icon, children }: DetailSectionProps) => {
  return (
    <Section>
      <Title>
        {icon && <span>{icon}</span>}
        {title}
      </Title>
      {children}
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  white-space: pre-line;
`;
const Title = styled.div`
  display: flex;
  gap: 20px;
  color: var(--main-white);
  font-size: 18px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.9px;

  span {
    width: 16px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -1.2px;

    span {
      width: 20px;
    }
  }
`;
