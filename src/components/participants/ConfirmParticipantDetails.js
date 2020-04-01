import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Descriptions } from "antd";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import Bulldozer from "../../static/images/bulldozer.png";
import Excavator from "../../static/images/excavator.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const ConfirmParticipantDetails = ({
  nextStep,
  prevStep,
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
  }
}) => {
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
          <Col span={6}>
            <Bulldozer />
          </Col>
          <Col span={12}>
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
              <Descriptions.Item label="First Name">
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
          </Col>
          <Col span={6}>
            <Excavator />
          </Col>
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
          <Button size="large" type="primary" onClick={nextStep}>
            Confirm
          </Button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

ConfirmParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ConfirmParticipantDetails);
