import React from "react";
import "./App.css";
import Authenticator from './components/authenticator.jsx'
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F3F8FF;
  }
`;


function App() {

  return (
    <div className="App">
      <GlobalStyle />
      <Authenticator />
    </div>
  );
}

export default App;
