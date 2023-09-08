import { Button, Col, Row, Typography } from "antd"
import { Layout, Spin } from "antd"
import React, { Fragment, useEffect, useState } from "react"

import Footer from "../layouts/Footer"
import Logo from "../../static/images/logo-main.png"
import Navbar from "../layouts/HomeNavbar"

const registrationStartDate = new Date(2023, 6, 19, 0, 0, 0)
const registrationEndDate = new Date(2023, 9, 30, 23, 59, 59)

export const isRegistrationWindowActive = () => {
  // check if current date is within the start date and end date
  const today = new Date()
  return registrationStartDate <= today && registrationEndDate >= today
}

const Home = () => {
  const { Content } = Layout
  const { Title } = Typography

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", marginTop: "100px" }}
      />
    )
  } else {
    return (
      <Fragment>
        <Content>
          <div className="landing-page">
            <Navbar />
            <div className="homepage-hero">
              <Row>
                <Col
                  span={10}
                  xl={10}
                  lg={10}
                  md={10}
                  sm={24}
                  xs={24}
                >
                  <div className="hero-logo">
                    <img
                      src={Logo}
                      alt="logo"
                    />
                  </div>
                </Col>
                <Col
                  span={14}
                  xl={14}
                  lg={14}
                  md={14}
                  sm={24}
                  xs={24}
                >
                  <div
                    className="register-invite"
                    style={{
                      paddingBottom: "20px"
                    }}
                  >
                    <div className="hero-motto">
                      <Title level={2}>
                        Vacation Bible School {new Date().getFullYear()}
                      </Title>
                    </div>
                    <div className="hero-tagline">
                      <Title level={4}></Title>
                    </div>
                    <div className="hero-motto">
                      <Title>Following Jesus Changes the Game.</Title>
                    </div>
                    <div className="hero-tagline">
                      <Title level={4}>
                        Spin the spinner, beat the clock, skip ahead, level up,
                        and play to win! You’ll need to bring your A-game for
                        this VBS. Twists & Turns is a fantastical celebration of
                        games of all kinds. From classic tabletop games to video
                        games and more, kids will play their way through VBS
                        while learning that Jesus guides them through all the
                        twists and turns of their lives. They’ll find that even
                        when they mess up it’s never “game over.”
                      </Title>
                    </div>
                    {/* Check if date is greater than 16th July, 2023 */}
                    {isRegistrationWindowActive() ? (
                      <>
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
                            paddingBottom: "10px"
                          }}
                        >
                          {" "}
                          OR{" "}
                        </span>
                      </>
                    ) : (
                      <p
                        style={{
                          color: "red",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          fontSize: "20px",
                          fontWeight: "bold",
                          textDecoration: "underline"
                        }}
                      >
                        PARTICIPANT REGISTRATION CLOSED
                      </p>
                    )}

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
    )
  }
}
export default Home
