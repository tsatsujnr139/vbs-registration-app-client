import { Layout, Menu } from "antd";
import React, { Fragment, useState } from "react";

import { LogoutOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { user }, logout }) => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = e => {
    setCurrent(e.key);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Fragment>
      <Header style={{ backgroundColor: "white", marginBottom: "7px" }}>
        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ float: "right" }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={current}
            mode="horizontal"
            style={{ float: "right", lineHeight: "65px" }}
          >
            <Menu.Item key="greeting" disabled="true">
              Hi, {user && user.first_name}
            </Menu.Item>
            <Menu.Item key="admin-logout" onClick={onLogout}>
              <LogoutOutlined />
              <span style={{ paddingLeft: "1px" }}>Logout</span>
            </Menu.Item>
          </Menu>
        </Menu>
      </Header>
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
