import React, { useEffect, useState } from "react"
import { Switch, Route, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Timeline from './pages/5-timeline'
import WindowInitial from './pages/2-login'
import Registration from './pages/1-registration'
import Prateleiras from './pages/3-prateleiras'
import Busca from './pages/4-busca'
import Header from './header'
import {
  requestValidate,
  logout,
} from '../redux/actions'
import 'antd/dist/antd.css';
import logo from "../images/books-login.svg";
import { Modal } from "antd";
import {
  LoginHeader,
  LoginSlogan,
  LoginImage,
  LoginA,
} from "./styles/styles"

const Authenticator = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false);
  };

  const dispatch = useDispatch()
  const history = useHistory()
  const authenticate = useSelector((state) => state.authenticate.isAuthenticated)


  //OBS APAGAR ESSAS FUNÇÕES DEPOIS DE COLOCAR NO HEADER DAQUI

  const doLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  const doBusca = () => {
    history.push('/busca')
  }

  const doTimeline = () => {
    history.push('/timeline')
  }

  const doPrateleiras = () => {
    history.push('/prateleiras')
  }

  // ATÉ AQUI




  useEffect(() => {
    dispatch(requestValidate())
  }, [dispatch])

  if (authenticate === undefined) {
    return <div>Loading...</div>
  }

  if (authenticate === false)
    return (
      <div className="App">
        <Switch>
          <Route path="/">
            <LoginHeader>BookBook</LoginHeader>
            <div className="Logo">
              <LoginImage src={logo} alt="logo" />
            </div>
            <div className="Login">
              <LoginSlogan>Descubra um mundo <br />de livros</LoginSlogan>
              <WindowInitial />
              <p>Ou <LoginA onClick={showModal}>registre-se agora</LoginA></p>
            </div>
            <Modal
              title="Cadastro"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Registration setVisible={setVisible} />
            </Modal>
          </Route>
        </Switch>
      </div>
    )

  return (
    <div>
      Autenticado
      <button onClick={doLogout}>LOGOUT</button>
      <button onClick={doBusca}>BUSCA</button>
      <button onClick={doTimeline}>TIMELINE</button>
      <button onClick={doPrateleiras}>PRATELEIRAS</button>
      <Switch>
        <Route path="/prateleiras">
          <Header />
          <Prateleiras />
        </Route>

        <Route path="/busca">
          <Header />
          <Busca />
        </Route>

        <Route path="/timeline/">
          <Header />
          <Timeline />


        </Route>

      </Switch>
    </div>
  )
}

export default Authenticator