import React, { Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import RegisterParticipant from "./components/participants/RegisterParticipant";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterParticipant} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
