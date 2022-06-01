import { Button, Result } from "antd";
import React, { Fragment } from "react";

import Confetti from "react-confetti";
import Navbar from "../layouts/Navbar";
import useWindowSize from "react-use/lib/useWindowSize";

const RegistrationSuccess = () => {
  const { width, height } = useWindowSize();

  return (
    <Fragment>
      <Navbar />
      <Confetti width={width} height={height} gravity={0.2} />
      <Result
        status="success"
        title={`You have successfully signed up as a volunteer for VBS ${new Date().getFullYear()}`}
        subTitle="The VBS Planning team is looking foward to working with you."
        extra={[
          <Button
            size="large"
            type="primary"
            key="participant"
            href="/participants/register"
            shape="round"
          >
            Click here to register a participant
          </Button>,
        ]}
      >
        {/* <div style={{ textAlign: "center" }}>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 18,
              }}
            >
              Please take note the the following information
            </Text>
          </Paragraph>
          <Paragraph>
            <InfoCircleOutlined style={{ color: "blue" }} /> Training for ALL
            volunteers will take place on *Date* at LIC. Futher communication
            will be sent to you in due course.
          </Paragraph>
        </div> */}
      </Result>
    </Fragment>
  );
};

export default RegistrationSuccess;
