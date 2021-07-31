import { injectGlobal } from 'emotion';
injectGlobal`
html {
  height: 100%;
  width: 100%;
}
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;

  }
  
  body {
    font-size: 10px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-x:hidden ;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    margin-top: 0px !important;
    height: 100%;

  }
  p{
    font-size: 14px;
  }
  img {
    border: 0;
  }
  #root {
    background: #e9e9e9;
    min-height: 100%;
    min-width: 100%;
  }
  a{
    text-decoration:none;
  }
  li{
    list-style-type:none;
  }
  button{
    outline: none !important;
    border: none;
    background: none;
    cursor: pointer;
  }

  input:focus,
  textarea:focus,
  button:focus,
  a:focus,
  article:focus {
    outline: none !important;
    border: none;
  }
`;
