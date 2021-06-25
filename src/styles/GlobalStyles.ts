import { createGlobalStyle } from "styled-components";

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
 * {
   margin:0;
   padding: 0;
   box-sizing: border-box;

   color: var(--primary);
 }
 html, body, #root {
   max-height: 100vh;
   height: 100%;
 }

 .ant-steps-item-finish
  > .ant-steps-item-container
  > .ant-steps-item-tail::after {
  background-color: #d8966e !important;
}



 ul{
  list-style: none;
 }

 *, button, input {
   border: 0;
   background: none;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }

 button {   
   cursor: pointer;
   outline:none;
 }

 html {
   background: #fadcc4;
 }

 :root {
    --primary: #000;
    --secondary: #15181C;
    --search: #202327;
    --background:#f2f3f5;
    --white: #D9D9D9;
    --gray: #7A7A7A;
    --outline: #2F3336;
    --retweet: #00C06B;
    --like: #E8265E;
    --twitter: #33A1F2;
    --twitter-dark-hover: #011017;
    --twitter-light-hover: #2C8ED6;
    --color-background: #f0f0f7;
    --color-primary-lighter: #9871f5;
    --color-primary-light: #916bea;
    --color-primary: #8257e5;
    --color-primary-dark: #774dd6;
    --color-primary-darker: #6842c2;
    --color-secundary: #04d361;
    --color-secundary-dark: #04bf58;
    --color-title-in-primary: #ffffff;
    --color-text-in-primary: #d4c2ff;
    --color-text-title: #32264d;
    --color-text-complement: #9c98a6;
    --color-text-base: #6a6180;
    --color-line-in-white: #e6e6f0;
    --color-input-background: #f8f8fc;
    --color-button-text: #ffffff;
    --color-box-base: #ffffff;
    --color-box-footer: #fafafc;
  }
`;
