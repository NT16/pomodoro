import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import "./App.css";
import Ticker from "./components/Ticker";
import NavbarWithRouter from "./components/presentation/Navbar";
import Settings from "./components/Settings";
import About from "./components/About";

const App = () => {
  return (
    <div className="App">
      <Router className="container">
        <NavbarWithRouter />
        <Switch>
          <Route path="/home" render={() => <Ticker />} />
          <Route path="/settings" render={() => <Settings />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/" render={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
