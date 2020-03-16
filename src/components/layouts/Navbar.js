import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import LogoTitle from "../../static/images/logo-title.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onLogout = e => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Menu
        onClick={onClick}
        selectedKeys={current}
        mode="horizontal"
        style={{ textAlign: "end", lineHeight: "70px" }}
      >
        <Menu.Item key="greeting" disabled="true">
          Hello {user && user.name}
        </Menu.Item>
        <Menu.Item key="admin-logout" onClick={onLogout}>
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    </Fragment>
  );

  const guestLinks = (
    <Menu
      onClick={onClick}
      selectedKeys={current}
      mode="horizontal"
      style={{ textAlign: "end", lineHeight: "70px" }}
    >
      <Menu.Item key="admin-login">
        <LoginOutlined />
        <Link to="/admin/login">Are you an admin? Login here</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Header style={{ backgroundColor: "white", marginBottom: "7px" }}>
        <a href="/">
          <img
            src={process.env.PUBLIC_URL + "/liclogo.png"}
            alt="LIC Logo"
            height="65"
            width="70"
            style={{ float: "left" }}
          />{" "}
        </a>

        <a href="/">
          <img
            src={LogoTitle}
            alt="Logo"
            height="65"
            width="100"
            style={{ float: "left" }}
          />{" "}
        </a>

        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ textAlign: "end", lineHeight: "70px" }}
        >
          {isAuthenticated ? authLinks : guestLinks}
        </Menu>
      </Header>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
