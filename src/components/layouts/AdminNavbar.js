import React, { useState, Fragment } from "react";
import { Menu, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";

const Navbar = ({ auth: { user }, logout }) => {
  const [current, setCurrent] = useState("");

  const { Header } = Layout;

  const onClick = (e) => {
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
          style={{ textAlign: "end" }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={current}
            mode="horizontal"
            style={{ textAlign: "end", lineHeight: "63px" }}
          >
            <Menu.Item key="greeting" disabled="true">
              Hi {user && user.first_name}
            </Menu.Item>
            <Menu.Item key="admin-logout" onClick={onLogout}>
              <LogoutOutlined />
              Logout
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
