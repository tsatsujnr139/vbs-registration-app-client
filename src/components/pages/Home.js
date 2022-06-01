import { Button, Col, Row, Typography } from "antd";
import { Layout, Spin } from "antd";
import React, { Fragment, useEffect, useState } from "react";

import Footer from "../layouts/Footer";
import Logo from "../../static/images/logo-main.png";
import Navbar from "../layouts/HomeNavbar";

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
        <Content>
          <div className="landing-page">
            <Navbar />
            <div className="homepage-hero">
              <Row>
                <Col span={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                  <div className="hero-logo">
                    <img src={Logo} alt="logo" />
                  </div>
                </Col>
                <Col span={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                  <div
                    className="register-invite"
                    style={{
                      paddingBottom: "20px",
                    }}
                  >
                    <div className="hero-motto">
                      <Title level={2}>
                        Vacation Bible School {new Date().getFullYear()}
                      </Title>
                    </div>
                    <div className="hero-tagline">
                      <Title level={4}>Show kids the beautiful truth!</Title>
                    </div>
                    <div className="hero-motto">
                      <Title>
                        Created in Christ. Designed for God&apos;s Purpose.
                      </Title>
                    </div>
                    <div className="hero-tagline">
                      <Title level={4}>
                        Spark imagination and kick creativity into high gear at
                        Spark Studios. In summer 2022, kids will learn that
                        God’s creativity didn’t stop in Genesis. The Master
                        Artist is working to redeem, reclaim, and transform
                        us–His creation–to the design He planned for us. Kids
                        will see the beautiful truth that they are God’s
                        workmanship as they learn to use their talents to bring
                        glory to Him.
                      </Title>
                    </div>
                    <Button
                      size="large"
                      shape="round"
                      type="primary"
                      href="participants/register"
                    >
                      REGISTER PARTICIPANT
                    </Button>
                    <span
                      style={{
                        color: "white",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      {" "}
                      OR{" "}
                    </span>

                    <Button
                      size="large"
                      shape="round"
                      href="volunteers/register"
                    >
                      SIGN UP AS A VOLUNTEER
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
        <Footer />
      </Fragment>
    );
  }
};
export default Home;
