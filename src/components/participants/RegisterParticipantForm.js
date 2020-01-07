import React, { Fragment } from "react";
import RegistrationProgressBar from "./RegistrationProgressBar";
import FormParticipantDetails from "./FormParticipantDetails";
import { Row, Col } from "antd";

const RegisterParticipantForm = () => {
  return (
    <Fragment>
      <RegistrationProgressBar />
      <div className="form-wrapper">
        <Row>
          <Col span={4}></Col>
          <Col span={16} style={{ display: "block" }}>
            <FormParticipantDetails />
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default RegisterParticipantForm;
