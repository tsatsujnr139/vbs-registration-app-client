import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import Dashboard from "./Dashboard";
import LogoTitle from "../../static/images/logo-2.png";
import VolunteerDashboard from "./VolunteerDashboard";
import ParticipantDashboard from "./ParticipantDashboard";
import {
  UserOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined
} from "@ant-design/icons";
import Navbar from "../layouts/AdminNavbar";
import Footer from "../layouts/Footer";

const AdminPanel = props => {
  const {
    auth: { isAuthenticated },
    history
  } = props;

  const { Sider, Content } = Layout;
  const [render, updateRender] = useState(1);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   history.push("/admin/login");
    // }
  }, [isAuthenticated, history]);

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  const components = {
    1: <Dashboard />,
    2: <ParticipantDashboard />,
    3: <VolunteerDashboard />
  };

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
            style={{ height: "100%" }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="1">
              <DashboardOutlined />
              Dashboard
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              Participants
            </Menu.Item>
            <Menu.Item key="3">
              <TeamOutlined />
              Volunteers
            </Menu.Item>
            <Menu.Item key="4">
              <SettingOutlined />
              Admins
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Layout>
            <Navbar />
            <Content
              style={{
                minHeight: 600,
                height: "calc(100%)"
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminPanel);
