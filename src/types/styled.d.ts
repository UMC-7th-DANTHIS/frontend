import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      mainPurple: string;
      mainWhite: string;
      textPurple: string;
      textGray: string;
      textSecondaryGray: string;
      mainGradation: string;
    };
    media: {
      mobile: string;
      tablet: string;
      desktop: string;
      max: string;
    };
  }
}

