import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { Layout } from "antd";
import Logo from "../../static/images/logo-main.png";

const Home = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const onClick = () => {};

  return (
    <Content>
      <div className="homepage-hero">
        <Row>
          <Col span={14}>
            <div className="hero-logo">
              <img src={Logo} alt="logo" />
            </div>
          </Col>
          <Col span={10}>
            <div className="register-invite">
              <div className="hero-motto">
                <Title>BUILDING ON THE</Title>
                <Title>LOVE OF JESUS</Title>
              </div>
              <div className="hero-tagline">
                <Title level={4}>Show kids the foundation that lasts!</Title>
              </div>
              <Button
                // block
                type="danger"
                size="large"
                className="btn-block"
                href="/register"
              >
                REGISTER
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Home;
