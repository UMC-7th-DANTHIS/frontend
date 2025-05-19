import styled from 'styled-components';
import SingleBtnAlert from '../../../components/SingleBtnAlert';
import ConfirmLeaveAlert from '../../../components/ConfirmLeaveAlert';

interface FormAlertProps {
  showInvalidAlert: boolean;
  setShowInvalidAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showLeaveAlert: boolean;
  setShowLeaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormAlert({
  showInvalidAlert,
  setShowInvalidAlert,
  showLeaveAlert,
  setShowLeaveAlert
}: FormAlertProps) {
  return (
    <>
      {showInvalidAlert && (
        <SingleBtnAlert
          message={
            <AlertText>
              모든 항목을{'\n'}
              <Highlight>적절하게 </Highlight>
              입력했는지 확인해주세요.
            </AlertText>
          }
          onClose={() => setShowInvalidAlert(false)}
          mariginsize="33px"
          showButtons={true}
        />
      )}

      {showLeaveAlert && (
        <ConfirmLeaveAlert
          message={
            <AlertText>
              해당 페이지를 벗어나면{'\n'}
              작성 중인 정보가 <Highlight> 모두 삭제</Highlight>됩니다.
              {'\n'}
              떠나시겠습니까?
            </AlertText>
          }
          onClose={() => setShowLeaveAlert(false)}
          showButtons={true}
        />
      )}
    </>
  );
}

const AlertText = styled.span`
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  white-space: pre-line;
`;
const Highlight = styled.span`
  color: #a60f62;
  font-weight: bold;
`;
