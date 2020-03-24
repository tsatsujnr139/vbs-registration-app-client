import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button, Typography } from "antd";
import { Layout, Spin } from "antd";
import Logo from "../../static/images/logo-main.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Home = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  } else {
    return (
      <Fragment>
        <Navbar />
        <Content>
          <div className="homepage-hero">
            <Row>
              <Col span={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                <div className="hero-logo">
                  <img src={Logo} alt="logo" />
                </div>
              </Col>
              <Col span={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                <div className="register-invite">
                  <div className="hero-motto">
                    <Title>BUILDING ON THE LOVE OF JESUS</Title>
                  </div>
                  <div className="hero-tagline">
                    <Title level={4}>
                      Show kids the foundation that lasts!
                    </Title>
                  </div>
                  <Button.Group size="large">
                    <Button type="danger" href="participants/register">
                      REGISTER PARTICIPANT
                    </Button>
                    <span style={{ color: "white" }}> OR </span>

                    <Button type="danger" href="volunteers/register">
                      SIGN UP AS A VOLUNTEER
                    </Button>
                  </Button.Group>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer />
      </Fragment>
    );
  }
};
export default Home;
