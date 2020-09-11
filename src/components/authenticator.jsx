import React, { useEffect } from "react"
import { Switch, Route, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Timeline from './pages/5-timeline'
import Login from './pages/2-login'
import Header from './header'
import {
  requestValidate,
  logout,
} from '../redux/actions'

const Authenticator = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const authenticate = useSelector((state) => state.authenticate.isAuthenticated)

  const doLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  useEffect(() => {
    dispatch(requestValidate())
  }, [dispatch])

  if (authenticate === undefined) {
    return <div>Loading...</div>
  }

  if (authenticate === false)
    return (
      <div>
        Não autenticado
        <Switch>
          <Route path="/">
            <Header />
            <Login />
          </Route>
        </Switch>

        {/*  <Route path="/register">
                <Register />
              </Route> */}

        {/* <Route path="/">
                  <Home />
              </Route> */}

      </div>
    )

  return (
    <div>
      Autenticado
      <button onClick={doLogout}>LOGOUT</button>
      <Switch>
        {/* <Route path="/prateleiras">
                  <Prateleiras />
              </Route>

            <Route path="/busca">
                <Busca />
            </Route>  */}

        <Route path="/timeline/">
          <Header />
          <Timeline />


        </Route>

      </Switch>
    </div>
  )
}

export default Authenticator