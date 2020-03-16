import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Card, Icon } from "antd/lib";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import Bulldozer from "../../static/images/bulldozer.png";
import Excavator from "../../static/images/excavator.png";
import Navbar from "../layouts/Navbar";

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
            <img src={Excavator} alt="bulldozer" />
          </Col>
          <Col span={12}>
            <Card
              title="PARTICIPANT DETAILS"
              extra={<Icon type="user" />}
              hoverable={true}
              headStyle={headStyle}
              style={{ borderRadius: "12px" }}
            >
              <p>
                <strong>Surname: </strong>
                {surname}
              </p>
              <p>
                <strong>First Name: </strong>
                {firstName}
              </p>
              <p>
                <strong>Age: </strong>
                {age}
              </p>
              <p>
                <strong>Gender: </strong>
                {gender}
              </p>
              <p>
                <strong>Class: </strong>
                {grade}
              </p>
              <p>
                <strong>Church : </strong>
                {church}
              </p>
              <p>
                <strong>Medical Information: </strong>
                {medicalInfo || "N/A"}
              </p>
            </Card>
          </Col>
          <Col span={6}></Col>
        </Row>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center"
          }}
        ></span>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Card
              title="PARENT/GUARDIAN DETAILS"
              extra={<Icon type="team" />}
              hoverable={true}
              headStyle={headStyle}
              style={{ borderRadius: "12px" }}
            >
              <p>
                <strong>Full Name: </strong>
                {fullName}
              </p>
              <p>
                <strong>Primary Phone Number: </strong>
                {phone}
              </p>
              <p>
                <strong>Alternate Phone Number: </strong>
                {alternatePhone}
              </p>
              <p>
                <strong>Email: </strong>
                {email}
              </p>
              <p>
                <strong>Pickup Person Name: </strong>
                {pickupPersonName}
              </p>
              <p>
                <strong>Pickup Person Number: </strong>
                {pickupPersonPhone}
              </p>
            </Card>
          </Col>
          <Col span={6}>
            <img src={Bulldozer} alt="crane" />
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
    </Fragment>
  );
};

const headStyle = {
  fontFamily: "QuickSand",
  fontSizeAdjust: "1.0"
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
