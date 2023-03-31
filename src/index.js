import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'S-CoreDream-3Light';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: 'S-CoreDream-3Light';

  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}


body{
  background-color: #9b67cf;
  font-family: 'S-CoreDream-3Light';
  font-weight: 400;
  font-size: 1.5vw;
  line-height: 2.75vw;
  color: #9b67cf;
}

input[type=text], input[type=url], input[type=email], input[type=password], textarea{
  border: none;
  border-bottom: 2px solid #9b67cf;
  padding: 1vh 1vw;
  font-family: 'S-CoreDream-3Light';
  font-size: 1.5vw;
  color: #9b67cf;
  outline: none;
  line-height:140%;
  resize: none;
  background: rgba(155,103,207, 0.2);
  width: 90%;
  ::placeholder{
    color: rgba(155,103,207, 0.5);
    font-size: 1.2vw;
  }
}

input[type=url]{
  width: 90%;
  margin-bottom: 5vh;
}

input[type=submit], button{
  font-family: "S-CoreDream-3Light";
  border: 2px solid #9b67cf;
  border-radius: 25px;
  background-color: white;
  padding: 0.5vh 0.8vw;
  margin:  0;
  margin-right: 0.75vw; 
  font-size: 1.8vw;
  cursor: pointer;
  color: #9b67cf;
  transition: 0.3s;
}

input[type=submit]:hover{
  background-color: #9b67cf;
  color: white;
}

button:hover {
  background-color: #9b67cf;
  color: white;
}

a{
  text-decoration: none;
  color: #9b67cf;
}

h4{
  font-weight: 900;
  font-size: 3.6vw;
  line-height: 140%;
  letter-spacing: 0.15vw;
  word-spacing: 0.2vw;
}


h5{
  font-weight: 400;
  font-size: 2vw;
  line-height: 4vw;
}

h6{
  font-size: 1.5vw;;
  font-weight: 900;
  margin-bottom: -2vh;
}

a{
  text-decoration: underline;
}

hr {
  border: 0;
  height: 0;
  border-top: 0 solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(155,103,207, 0.8);
  margin: 2vh 0;
}


@media only screen and (max-width: 768px){
  body{
    font-size: 16px;
    line-height: 22px;
  }

  input[type=text], input[type=url], input[type=email], input[type=password], textarea{
    border-bottom: 1.5px solid #9b67cf;
    padding: 1vh 1vw;
    font-size: 14px;
    line-height:140%;
    width: 100%;
    ::placeholder{
      font-size: 14px;
    }
  }

  input[type=submit], button{
    border: 1.5px solid #9b67cf;
    font-size: 24px;
    padding: 0.7vh 3vw;
    margin-right: 3vw; 
  }

  input[type=url]{
    width: 100%;
  }

  h5{
    font-size: 33px;
  }

  h6{
    font-size: 18px;
    font-weight: 900;
    margin-bottom: -2vh;
  }

  hr {
    border-bottom: 1.5px solid rgba(155,103,207, 0.8);
  }
}
`;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

