import React from "react";
import { Layout, Steps, Icon, Typography } from "antd";

const RegistrationProgressBar = () => {
  const { Content } = Layout;
  const { Step } = Steps;
  const { Title } = Typography;

  return (
    <Content>
      <div className="section-title">
        <Title level={3}>Let's get you registered</Title>
      </div>
      <Steps className="registration-progress-bar">
        <Step
          status="process"
          title="Participant Details"
          icon={<Icon type="user" />}
        ></Step>
        <Step
          status="wait"
          title="Parent/Guardian Details"
          icon={<Icon type="team" />}
        ></Step>
        <Step
          status="wait"
          title="Confirm Details"
          icon={<Icon type="solution" />}
        ></Step>
        <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
      </Steps>
    </Content>
  );
};

export default RegistrationProgressBar;
