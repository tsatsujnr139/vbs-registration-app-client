import React from "react";
import { Layout, Steps, Typography } from "antd";
import PropTypes from "prop-types";
import {
  TeamOutlined,
  SmileOutlined,
  UserOutlined,
  SolutionOutlined
} from "@ant-design/icons";

const ParticipantRegistrationProgressBar = ({ step, title }) => {
  const { Content } = Layout;
  const { Step } = Steps;
  const { Title } = Typography;

  return (
    <Content>
      <div className="section-title">
        <Title level={3}>{title}</Title>
      </div>
      <Steps current={step} className="registration-progress-bar">
        <Step title="Participant Details" icon={<UserOutlined />}></Step>
        <Step title="Parent/Guardian Details" icon={<TeamOutlined />}></Step>
        <Step title="Confirm Details" icon={<SolutionOutlined />}></Step>
        <Step title="Done" icon={<SmileOutlined />} />
      </Steps>
    </Content>
  );
};

ParticipantRegistrationProgressBar.propTypes = {
  step: PropTypes.number.isRequired
};

export default ParticipantRegistrationProgressBar;
