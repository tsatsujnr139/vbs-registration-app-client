import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Descriptions, Card, Modal, Spin } from "antd";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import Motto1 from "../../static/images/motto_01.png";
import LogoGrayscale from "../../static/images/logo_grayscale.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { registerParticipant, clearErrors } from "../../actions/participantActions";

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
      session,
      attendance_type,
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
    participantDetails.session = participantDetails.session.id
    participantDetails.attendance_type = participantDetails.attendance_type.id
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
            <img src={Motto1} alt="" />
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
                  {last_name}
                </Descriptions.Item>
                <Descriptions.Item label="First Name" span={1}>
                  {first_name}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  {date_of_birth}
                </Descriptions.Item>
                <Descriptions.Item label="Age">{age}</Descriptions.Item>
                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                <Descriptions.Item label="Class">{grade}</Descriptions.Item>
                <Descriptions.Item label="Church" span={3}>
                  {church}
                </Descriptions.Item>
                <Descriptions.Item label="Session">
                  {session.name}
                </Descriptions.Item>
                <Descriptions.Item label="Date (Needs to be Changed)">
                  {session.start_date} - {session.end_date}
                </Descriptions.Item>
                <Descriptions.Item label="Attendance Type">
                  {attendance_type.name}
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
            size="large"
            type="primary"
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

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant,
});

ConfirmParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerParticipant: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerParticipant, clearErrors })(
  ConfirmParticipantDetails
);
