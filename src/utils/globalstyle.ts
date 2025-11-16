import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
  }

  #root {
    min-height: 100vh;
    background-color: #000;
  }
`;

export default GlobalStyle;
