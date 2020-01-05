import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Layout } from "antd";
import LogoTitle from "../../static/images/logo-title.png";

const Navbar = () => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    // <div className="header-color">

    // </div>
    <Fragment>
      <Header style={{ backgroundColor: "white" }}>
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
          <Menu.Item key="admin login">
            <Link to="/admin/login">
              <Icon type="login" />
              Are you an admin? Login here
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Fragment>
  );
};

export default Navbar;
