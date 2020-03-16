import React, { Fragment } from "react";
import { Layout, Steps, Icon, Typography } from "antd/lib";
import PropTypes from "prop-types";
import Navbar from "../layouts/Navbar";

const VolunteerRegistrationProgressBar = ({ step, title }) => {
  const { Content } = Layout;
  const { Step } = Steps;
  const { Title } = Typography;

  return (
    <Fragment>
      <Navbar />
      <Content>
        <div className="section-title">
          <Title level={3}>{title}</Title>
        </div>
        <Steps current={step} className="registration-progress-bar">
          <Step title="Volunteer Details" icon={<Icon type="user" />}></Step>
          <Step title="Confirm Details" icon={<Icon type="solution" />}></Step>
          <Step title="Done" icon={<Icon type="smile-o" />} />
        </Steps>
      </Content>
    </Fragment>
  );
};

VolunteerRegistrationProgressBar.propTypes = {
  step: PropTypes.number.isRequired
};

export default VolunteerRegistrationProgressBar;
