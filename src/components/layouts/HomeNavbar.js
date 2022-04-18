import { Layout, Menu } from "antd";
import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import LogoTitle from "../../static/images/logo-title.png";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = e => {
    setCurrent(e.key);
  };

  const guestLinks = (
    <Menu
      onClick={onClick}
      selectedKeys={current}
      mode="horizontal"
      style={{ color: "white", backgroundColor: "transparent" }}
    >
      <Menu.Item key="admin-login">
        <LoginOutlined />
        <Link to="/admin/login" style={{ color: "white", paddingLeft: "4px" }}>
          Are you an admin? Login here
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <Header style={{ backgroundColor: "transparent" }}>
        <a href="/">
          <img
            src={process.env.PUBLIC_URL + "/liclogo.png"}
            alt="LIC Logo"
            height="60"
            width="48"
            style={{ paddingTop: "15px", float: "left" }}
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
          style={{
            float: "right",
            backgroundColor: "transparent",
          }}
        >
          {guestLinks}
        </Menu>
      </Header>
    </Fragment>
  );
};

export default Navbar;
