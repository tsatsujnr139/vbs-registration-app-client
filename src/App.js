import React, { Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import RegisterParticipant from "./components/participants/RegisterParticipantForm";
import RegisterVolunteerForm from "./components/volunteers/RegisterVolunteerForm";
import ConfirmParticipantDetails from "./components/participants/ConfirmParticipantDetails";
import RegistrationSuccess from "./components/participants/ParticipantRegistrationSuccess";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import FormGuardianDetails from "./components/participants/FormGuardianDetails";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
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
            <Route exact path="/guardian" component={FormGuardianDetails} />
            <Route exact path="/success" component={RegistrationSuccess} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
