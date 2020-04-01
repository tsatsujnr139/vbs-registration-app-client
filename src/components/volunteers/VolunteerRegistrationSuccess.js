import React, { Fragment } from "react";
import Navbar from "../layouts/Navbar";
import { Result, Button, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const RegistrationSuccess = () => {
  const { Paragraph, Text } = Typography;

  return (
    <Fragment>
      <Navbar />
      <Result
        status="success"
        title="You have successfully signed up as a volunteer for VBS 2020! "
        subTitle="The VBS Planning team is looking foward to working with you."
        extra={[
          <Button type="primary" key="participant" href="participants/register">
            Click here to register a participant
          </Button>
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 18
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
        </div>
      </Result>
    </Fragment>
  );
};

export default RegistrationSuccess;
