import React from "react";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Navbar = (props) => {
  const { location } = props;

  return (
    <div className="row header">
      <h1 className="col-md-6 col-xs-12">Pomodoro</h1>

      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        className="navbar-margin col-md-6 col-xs-12"
        activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/settings">Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default withRouter(Navbar);
