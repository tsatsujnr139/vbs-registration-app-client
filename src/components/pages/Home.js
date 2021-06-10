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
              <Col span={13} xl={13} lg={13} md={13} sm={24} xs={24}>
                <div className="hero-logo">
                  <img src={Logo} alt="logo" />
                </div>
              </Col>
              <Col span={11} xl={11} lg={11} md={11} sm={24} xs={24}>
                <div className="register-invite">
                  <div className="hero-motto">
                    <Title level={2}>
                      Vacation Bible School {new Date().getFullYear()}
                    </Title>
                  </div>
                  <div className="hero-tagline">
                    <Title level={4}>
                      Priceless Treasure Awaits! Join us on this expedition!
                    </Title>
                    <Title level={4}>This Year We're</Title>
                  </div>
                  <div className="hero-motto">
                    <Title>UNEARTHING THE TRUTH ABOUT JESUS!</Title>
                  </div>
                  <div className="hero-tagline">
                    <Title level={4}>Seek Truth! Find Jesus!</Title>
                  </div>
                  <Button.Group size="large">
                    <Button type="primary" href="participants/register">
                      REGISTER PARTICIPANT
                    </Button>
                    <span style={{ color: "white" }}> OR </span>

                    <Button href="volunteers/register">
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
