import React, { Fragment } from "react";
import { Layout, Steps, Typography } from "antd";
import PropTypes from "prop-types";
import {
  SmileOutlined,
  UserOutlined,
  SolutionOutlined
} from "@ant-design/icons";

const VolunteerRegistrationProgressBar = ({ step, title }) => {
  const { Content } = Layout;
  const { Step } = Steps;
  const { Title } = Typography;

  return (
    <Fragment>
      <Content>
        <div className="section-title">
          <Title level={3}>{title}</Title>
        </div>
        <Steps current={step} className="registration-progress-bar">
          <Step title="Volunteer Details" icon={<UserOutlined />} />
          <Step title="Confirm Details" icon={<SolutionOutlined />} />
          <Step title="Done" icon={<SmileOutlined />} />
        </Steps>
      </Content>
    </Fragment>
  );
};

VolunteerRegistrationProgressBar.propTypes = {
  step: PropTypes.number.isRequired
};

export default VolunteerRegistrationProgressBar;
