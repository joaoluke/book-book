import React, {useState} from "react";
import "./App.css";
import 'antd/dist/antd.css';
import {  Modal, Button  } from "antd"; 

import logo from  "./images/books-login.svg";

import WindowInitial from "./components/pages/2-login";
import Registration from "./components/pages/1-registration"

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
      <header className="Bookbook">BookBook</header>
      <div className="Logo">
        <img src={logo} />
      </div>
      <div className="Login">
        <h1 className="Slogan">Descubra um mundo <br/>de livros</h1>
        <WindowInitial />
        <p>Ou <a onClick={showModal}>registre-se agora</a></p>
       </div>
      <Modal
          title="Cadastro"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Registration />
        </Modal>
    </div>
  );
}

export default App;
