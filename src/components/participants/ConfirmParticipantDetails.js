import { Button, Card, Col, Descriptions, Modal, Row, Spin } from "antd";
import React, { Fragment, useEffect } from "react";
import {
  clearErrors,
  registerParticipant,
} from "../../actions/participantActions";

import Accent3 from "../../static/images/accent-3.png";
import Footer from "../layouts/Footer";
import LogoGrayscale from "../../static/images/logo_grayscale.png";
import Navbar from "../layouts/Navbar";
import PropTypes from "prop-types";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import { connect } from "react-redux";

const ConfirmParticipantDetails = ({
  nextStep,
  prevStep,
  formDetails: { participantDetails, guardianDetails },
  formDetails: {
    participantDetails: {
      last_name,
      first_name,
      date_of_birth,
      age,
      grade,
      gender,
      church,
      medical_info,
    },
    guardianDetails: {
      parent_name,
      primary_contact_no,
      alternate_contact_no,
      whatsApp_no,
      email,
      pickup_person_name,
      pickup_person_contact_no,
    },
    step,
  },
  registerParticipant,
  clearErrors,
  participant: { error, loading, success },
}) => {
  useEffect(() => {});

  const onConfirm = (participantDetails, guardianDetails) => {
    // register the participant
    registerParticipant({
      ...participantDetails,
      ...guardianDetails,
    });
  };

  const errorAlert = () => {
    Modal.error({
      title: "Error Completing Registration",
      content:
        "There was an error completing your registration at this time. Please try again later",
    });
  };

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  }

  if (error) {
    errorAlert();
    clearErrors();
  }
  if (success) {
    nextStep();
  }

  return (
    <Fragment>
      <Navbar />
      <RegistrationProgressBar
        step={step - 1}
        title="Please Confirm Your Details"
      />
      <div
        className="confirm-details-wrapper"
        style={{ background: "#f3f5f7", padding: "30px" }}
      >
        <Row>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}>
            <img src={Accent3} alt="" />
          </Col>
          <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card hoverable="true">
              <Descriptions
                title="Participant Details"
                layout="vertical"
                size="default"
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
                labelStyle={{ fontWeight: "800" }}
              >
                <Descriptions.Item label="Surname" span={2}>
                  {last_name}
                </Descriptions.Item>
                <Descriptions.Item label="First Name" span={1}>
                  {first_name}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {new Date(date_of_birth).toDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Age">{age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                <Descriptions.Item label="Class">{grade}</Descriptions.Item>
                <Descriptions.Item label="Church" span={3}>
                  {church}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}>
            <img src={LogoGrayscale} alt="" />
          </Col>
        </Row>
        <span
          style={{
            display: "inline-block",
          }}
        ></span>
        <Row>
          <Col span={6}></Col>
          <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card hoverable="true">
              <Descriptions
                title="Guardian Details"
                layout="vertical"
                size="default"
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
              >
                <Descriptions.Item label="Full Name" span={2}>
                  {parent_name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Primary Contact Number" span={2}>
                  {primary_contact_no}
                </Descriptions.Item>
                <Descriptions.Item label="Alternate Contact Number">
                  {alternate_contact_no}
                </Descriptions.Item>
                <Descriptions.Item label="WhatsApp Number">
                  {whatsApp_no}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Pick Up Person Name" span={2}>
                  {pickup_person_name}
                </Descriptions.Item>
                <Descriptions.Item label="Pick up Person Phone">
                  {pickup_person_contact_no}
                </Descriptions.Item> */}
              </Descriptions>
            </Card>
          </Col>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}></Col>
        </Row>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center",
          }}
        ></span>
        <div className="confirm-buttons-wrapper">
          <Button size="large" type="default" onClick={prevStep}>
            Back
          </Button>
          <span
            style={{
              display: "inline-block",
              width: "24px",
              textAlign: "center",
            }}
          ></span>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={() => onConfirm(participantDetails, guardianDetails)}
          >
            Confirm
          </Button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

ConfirmParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerParticipant: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant,
});

export default connect(mapStateToProps, { registerParticipant, clearErrors })(
  ConfirmParticipantDetails
);
