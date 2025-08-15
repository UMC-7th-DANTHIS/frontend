const breakpoints = {
  tablet: '768px', // 태블릿 뷰는 768px부터 시작
  desktop: '1024px' // 데스크탑 뷰는 1024px부터 시작
};

export const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return { ...acc, [key]: `@media (min-width: ${value})` };
}, {});

export const theme = {
  colors: {
    mainPurple: '#9819c3',
    mainWhite: '#ffffff',
    textPurple: '#bf00ff',
    textGray: '#4d4d4d',
    textSecondaryGray: '#b2b2b2',
    mainGradation: 'linear-gradient(90deg, #b30505 0%, #9819c3 100%)'
  },
  media
};
