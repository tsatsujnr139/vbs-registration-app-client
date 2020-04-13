import React, { Fragment } from "react";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import RegisterParticipant from "./components/participants/RegisterParticipantForm";
import Login from "./components/admin/Login";
import RegisterVolunteerForm from "./components/volunteers/RegisterVolunteerForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Dashboard from "./components/admin/AdminPanel";
import PrivateRoute from "./routing/PrivateRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/participants/register"
              component={RegisterParticipant}
            />
            <Route
              exact
              path="/volunteers/register"
              component={RegisterVolunteerForm}
            />
            <Route exact path="/admin/login" component={Login} />
            <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
