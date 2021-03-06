import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import LogoTitle from "../../static/images/logo-title.png";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = (e) => {
    setCurrent(e.key);
  };

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
          />
        </a>

        <a href="/">
          <img
            src={LogoTitle}
            alt="Logo"
            height="75"
            width="100"
            style={{ float: "left" }}
          />
        </a>

        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ textAlign: "end", lineHeight: "70px" }}
        >
          {guestLinks}
        </Menu>
      </Header>
    </Fragment>
  );
};

export default Navbar;
