import React, { Fragment } from "react";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Home />
      </Fragment>
    </Router>
  );
};

export default App;
