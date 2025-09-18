import React from 'react';
import styled, { keyframes, css } from 'styled-components';

type Size = number | string;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** px 또는 %, rem 등 단위 허용 (숫자면 px 처리) */
  width?: Size;
  height?: Size;
  /** true면 원형(아바타) 형태. height 미지정 시 width와 동일 */
  circle?: boolean;
  /** radius 값 (px, rem 등). circle=true면 무시 */
  radius?: Size;
  /** inline-block 여부 */
  inline?: boolean;
  /** 애니메이션 사용 여부 */
  animate?: boolean;
  /** 배경/하이라이트 색상 (CSS color). 미전달 시 기본값 사용 */
  baseColor?: string;
  highlightColor?: string;
  /** 텍스트 스켈레톤 전용: 라인 수 */
  lines?: number;
  /** 텍스트 스켈레톤 전용: 라인 간격 */
  lineGap?: Size;
  /** 텍스트 마지막 라인 길이(가변 느낌) 0~100 (%) */
  lastLineWidthPercent?: number;
  /** 접근성: 로딩 중 컨테이너에 aria-busy 전달할 때 같이 쓰세요 */
  'aria-busy'?: boolean | 'true' | 'false';
}

const toCssSize = (v?: Size) => (typeof v === 'number' ? `${v}px` : v);

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const baseStyle = css<SkeletonProps>`
  --sk-base: ${({ baseColor }) => baseColor ?? '#222'};
  --sk-highlight: ${({ highlightColor }) => highlightColor ?? '#333'};

  position: relative;
  overflow: hidden;
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  border-radius: ${({ circle, radius }) => (circle ? '9999px' : (toCssSize(radius) ?? '12px'))};
  width: ${({ width }) => toCssSize(width) ?? '100%'};
  height: ${({ height, width, circle }) => toCssSize(height) ?? (circle ? (toCssSize(width) ?? '40px') : '16px')};

  background: linear-gradient(90deg, var(--sk-base) 25%, var(--sk-highlight) 37%, var(--sk-base) 63%);
  background-size: 400% 100%;
  ${({ animate = true }) =>
    animate
      ? css`
          animation: ${shimmer} 3s ease-in-out infinite;
        `
      : css`
          animation: none;
          background: var(--sk-base);
        `}
`;

const Block = styled.div<SkeletonProps>`
  ${baseStyle}
`;

/** 여러 줄 텍스트 스켈레톤 */
const LinesWrap = styled.div<{ gap: Size }>`
  display: grid;
  grid-auto-rows: max-content;
  row-gap: ${({ gap }) => toCssSize(gap) ?? '8px'};
`;

const Line = styled(Block)<{ w?: string }>`
  width: ${({ w }) => w ?? '100%'};
  height: 1em; /* 폰트 크기와 무관한 일정한 높이 */
`;

export const Skeleton: React.FC<SkeletonProps> = ({ lines, lineGap = 8, lastLineWidthPercent = 65, ...rest }) => {
  // lines가 지정되면 텍스트 스켈레톤 모드
  if (typeof lines === 'number' && lines > 0) {
    const arr = Array.from({ length: lines });
    return (
      <LinesWrap gap={lineGap} aria-hidden="true">
        {arr.map((_, i) => {
          const isLast = i === lines - 1;
          const w = isLast ? `${lastLineWidthPercent}%` : '100%';
          return <Line key={i} {...rest} w={w} />;
        })}
      </LinesWrap>
    );
  }

  // 기본 블록/아바타 스켈레톤
  return <Block aria-hidden="true" {...rest} />;
};

export default Skeleton;
