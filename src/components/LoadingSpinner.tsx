import React, { ReactNode } from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  isLoading: boolean;
  children?: ReactNode;
  marginTop?: string;
  marginBottom?: string;
  wrapperWidth?: string;
}

/**
 * 로딩 상태(`isLoading`)에 따라 로딩 스피너 또는
 * 실제 콘텐츠(`children`)를 표시하는 컴포넌트입니다.
 *
 * - `isLoading`이 `true`이면 중앙에 BeatLoader 스피너를 표시합니다.
 * - `isLoading`이 `false`이면 전달된 `children`을 렌더링합니다.
 * - `marginTop`, `marginBottom`과 `wrapperWidth`를 통해 스피너 컨테이너의 여백과 너비를 조정할 수 있습니다.
 *
 * @param {boolean} isLoading - 로딩 여부
 * @param {ReactNode} children - 로딩 완료 후 표시할 컴포넌트
 * @param {string} [marginTop='300px'] - 스피너의 상단 여백
 * @param {string} [marginBottom] - 스피너의 하단 여백
 * @param {string} [wrapperWidth] - 스피너 컨테이너의 width
 */
const LoadingSpinner = ({
  isLoading,
  children,
  marginTop = '300px',
  marginBottom,
  wrapperWidth
}: LoadingSpinnerProps) => {
  if (isLoading) {
    return (
      <SpinnerWrapper $marginTop={marginTop} $marginBottom={marginBottom} $width={wrapperWidth}>
        <BeatLoader color="#9819c3" size={15} margin={10} />
      </SpinnerWrapper>
    );
  }

  return <>{children}</>;
};

export default LoadingSpinner;

const SpinnerWrapper = styled.div<{ $marginTop: string; $marginBottom?: string; $width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ $marginTop }) => $marginTop};
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  width: ${({ $width }) => $width};
`;
