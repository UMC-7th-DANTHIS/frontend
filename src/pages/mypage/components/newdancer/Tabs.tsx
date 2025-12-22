import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TabProps {
  isActive: boolean;
}

export const Tabs = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TabWrapper>
        <Tab isActive={false} onClick={() => navigate(`?menu=editprofile`)}>
          유저
        </Tab>
        <Tab isActive={true}>댄서</Tab>
      </TabWrapper>

      <Divider />
    </div>
  );
};

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
  gap: 40px;
  align-items: end;
`;
const Tab = styled.div<TabProps>`
  color: ${(props) => (props.isActive ? 'white' : '#4D4D4D')};
  font-size: ${(props) => (props.isActive ? '16px' : '12px')};
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  line-height: normal;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${(props) => (props.isActive ? '22px' : '18px')};
  }
`;
const Divider = styled.div`
  width: 100%;
  flex-shrink: 0;
  border: 2px solid #ddd;
  margin-top: 10px;
`;
