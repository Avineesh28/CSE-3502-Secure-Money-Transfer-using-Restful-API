import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export default createGlobalStyle`
  ${normalize};

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 16px = 1.6rem || 12px = 1.2rem */

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-size: 1.6rem;
    /* font-family: 'Suisse-Regular', 'Helvetica', 'Arial', sans-serif; */
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    padding: 0;
    margin: 0;
    user-select: none;
    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    user-select: none;
  }

  p {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  ::selection {
    color: #ffffff;
    background-color: #000000;
  }
`;