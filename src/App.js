import "./App.css"

import React, { Fragment } from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import Dashboard from "./components/admin/AdminPanel"
import Home from "./components/pages/Home"
import Login from "./components/admin/Login"
import NotFound from "./components/pages/NotFound"
import ParticipantDashboard from "./components/admin/ParticipantDashboard"
import ParticipantPickupDashboard from "./components/admin/ParticipantPickupDashboard"
import { PersistGate } from "redux-persist/integration/react"
import PrivateRoute from "./routing/PrivateRoute"
import { Provider } from "react-redux"
import RegisterParticipant from "./components/participants/RegisterParticipantForm"
import RegisterVolunteerForm from "./components/volunteers/RegisterVolunteerForm"
import { Spin } from "antd"
import storeConfig from "./store"
import { isRegistrationWindowActive } from "./components/pages/Home"

const App = () => {
  const { store, persistor } = storeConfig

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <Spin
            size="large"
            style={{ marginLeft: "calc(50%)", marginTop: "200px" }}
          />
        }
        persistor={persistor}
      >
        <Router>
          <Fragment>
            <Switch>
              <Route
                exact
                path="/"
                component={Home}
              />

              {/* {isRegistrationWindowActive() && ( */}
              <Route
                exact
                path="/participants/register"
                component={RegisterParticipant}
              />
              {/* )} */}
              <Route
                exact
                path="/volunteers/register"
                component={RegisterVolunteerForm}
              />
              <Route
                exact
                path="/admin/login"
                component={Login}
              />
              <PrivateRoute
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path="/admin/attendance"
                component={ParticipantDashboard}
              />
              <PrivateRoute
                exact
                path="/admin/pickup"
                component={ParticipantPickupDashboard}
              />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
