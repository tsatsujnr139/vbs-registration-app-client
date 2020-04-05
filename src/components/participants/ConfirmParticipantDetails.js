import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Descriptions, Card, Modal } from "antd";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import Bulldozer from "../../static/images/bulldozer.png";
import Excavator from "../../static/images/excavator.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { registerParticipant } from "../../actions/participantActions";

const ConfirmParticipantDetails = ({
  nextStep,
  prevStep,
  formDetails: { participantDetails, guardianDetails },
  formDetails: {
    participantDetails: {
      surname,
      firstName,
      dateOfBirth,
      age,
      grade,
      gender,
      church,
      medicalInfo
    },
    guardianDetails: {
      fullName,
      phone,
      alternatePhone,
      email,
      pickupPersonName,
      pickupPersonPhone
    },
    step
  },
  registerParticipant,
  participant: { error }
}) => {
  useEffect(() => {}, [error]);

  const onConfirm = (participantDetails, guardianDetails) => {
    // register the participant
    registerParticipant({
      ...participantDetails,
      ...guardianDetails
    });
    // if successful show successful page
    // else show failure page and ask user to try again later;
    error ? errorAlert() : nextStep();
  };

  const errorAlert = () => {
    Modal.error({
      title: "Error Completing Registration",
      content:
        "There was an completing your registration at this time. Please try again later"
    });
  };

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
            <img src={Bulldozer} alt="" />
          </Col>
          <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card hoverable="true">
              <Descriptions
                title="Participant Details"
                layout="vertical"
                size="default"
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
              >
                <Descriptions.Item label="Surname" span={2}>
                  {surname}
                </Descriptions.Item>
                <Descriptions.Item label="First Name" span={1}>
                  {firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {dateOfBirth}
                </Descriptions.Item>
                <Descriptions.Item label="Age">{age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                <Descriptions.Item label="Class">{grade}</Descriptions.Item>
                <Descriptions.Item label="Church" span={3}>
                  {church}
                </Descriptions.Item>
                <Descriptions.Item label="Medical Information" span={3}>
                  {medicalInfo === "" ? medicalInfo : "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={6}>
            <img src={Excavator} alt="" />
          </Col>
        </Row>
        <span
          style={{
            display: "inline-block"
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
                  {fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number" span={2}>
                  {phone}
                </Descriptions.Item>
                <Descriptions.Item label="Alternate Contact Number">
                  {alternatePhone}
                </Descriptions.Item>
                <Descriptions.Item label="Pick Up Person Name" span={2}>
                  {pickupPersonName}
                </Descriptions.Item>
                <Descriptions.Item label="Pick up Person Phone">
                  {pickupPersonPhone}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}></Col>
        </Row>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center"
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
              textAlign: "center"
            }}
          ></span>
          <Button
            size="large"
            type="primary"
            onClick={onConfirm(participantDetails, guardianDetails)}
          >
            Confirm
          </Button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant
});

ConfirmParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerParticipant: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { registerParticipant })(
  ConfirmParticipantDetails
);
