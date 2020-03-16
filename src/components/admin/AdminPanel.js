import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, Menu, PageHeader } from "antd";
import Dashboard from "./Dashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import ParticipantDashboard from "./ParticipantDashboard";
import {
  UserOutlined,
  DashboardOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";

const AdminPanel = props => {
  const {
    auth: { isAuthenticated },
    history
  } = props;

  const { Sider, Content, Header, Footer } = Layout;
  const [render, updateRender] = useState(1);

  useEffect(() => {
    // if (!isAuthenticated) {
    //   history.push("/admin/login");
    // }
  }, [isAuthenticated]);

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
        <Header style={{backgroundColor:"white"}}>{/* <Navbar /> */}</Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
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
                <UsergroupAddOutlined />
                Volunteers
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{ padding: "5px 24px", minHeight: 800, height: "100%" }}
            >
              <div style={{ padding: "0px 24px 0px 24px", minHeight: 380 }}>
                {components[render]}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>©2020 LIC</Footer>
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
