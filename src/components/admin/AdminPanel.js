import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import AddAdmin from "./AddAdmin";
import Dashboard from "./Dashboard";
import Footer from "../layouts/Footer";
import LogoTitle from "../../static/images/logo-2.png";
import Navbar from "../layouts/AdminNavbar";
import ParticipantDashboard from "./ParticipantDashboard";
import PropTypes from "prop-types";
import VolunteerDashboard from "./VolunteerDashboard";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";

const AdminPanel = props => {
  const { loadUser } = props;

  const { Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const [render, updateRender] = useState(1);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  const components = {
    1: <Dashboard />,
    2: <ParticipantDashboard />,
    3: <VolunteerDashboard />,
    4: <AddAdmin />,
  };

  // if (loading) {
  //   return (
  //     <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
  //   );
  // }

  return (
    <Fragment>
      <Layout>
        <Sider collapsible breakpoint="md" theme="light">
          <a href="/admin/dashboard">
            <img
              src={LogoTitle}
              alt="Logo"
              height="60"
              style={{ paddingLeft: "30px" }}
            />
          </a>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1">
              <DashboardOutlined />
              <span style={{ paddingLeft: "1px" }}>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span style={{ paddingLeft: "1px" }}>Participants</span>
            </Menu.Item>
            <Menu.Item key="3">
              <TeamOutlined />
              <span style={{ paddingLeft: "1px" }}>Volunteers</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <SettingOutlined />
                  <span style={{ paddingLeft: "1px" }}>Admins</span>
                </span>
              }
            >
              <Menu.Item key="4">Add Admin</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Layout>
            <Navbar />
            <Content
              style={{
                minHeight: 600,
                height: "calc(100%)",
              }}
            >
              <div style={{ padding: "0px 24px 0px 24px", minHeight: 600 }}>
                {components[render]}
              </div>
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </Layout>
    </Fragment>
  );
};

AdminPanel.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(AdminPanel);
