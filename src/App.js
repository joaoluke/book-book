import React, { useState } from "react";
import "./App.css";
import Authenticator from './components/authenticator.jsx';
import { createGlobalStyle } from "styled-components";



const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F3F8FF;
  }
`;



function App() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };


  return (
    <div className="App">
      <GlobalStyle />
      <Authenticator />
    </div>
  );
}

export default App;
