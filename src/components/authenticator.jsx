import React, { useEffect } from "react"
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './pages/2-login'
import {
  requestValidate,
} from '../redux/actions'

const Authenticator = () => {
  const dispatch = useDispatch()
  const authenticate = useSelector((state) => state.authenticate.isAuthenticated)

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
      {/*  <Switch>
              <Route path="/prateleiras">
                  <Prateleiras />
              </Route>

            <Route path="/busca">
                <Busca />
            </Route>

            <Route path="/timeline/"> 
                <Timeline />
            </Route>

        </Switch> */}
    </div>
  )
}

export default Authenticator