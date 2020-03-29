import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Card } from "antd";
import RegistrationProgressBar from "./VolunteerRegistrationProgressBar";
import Bulldozer from "../../static/images/bulldozer.png";
import Excavator from "../../static/images/excavator.png";
import Navbar from "../layouts/Navbar";
import { UserOutlined } from "@ant-design/icons";

const ConfirmVolunteerDetails = ({
  nextStep,
  prevStep,
  formDetails: {
    volunteerDetails: {
      surname,
      firstName,
      role,
      phoneNumber,
      whatsappNumber,
      email,
      gender,
      preferredGrade,
      church,
      previousVolunteer,
      volunteerSite
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
              title="VOLUNTEER DETAILS"
              extra={<UserOutlined />}
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
                <strong>Gender: </strong>
                {gender}
              </p>
              <p>
                <strong>Preferred Class: </strong>
                {preferredGrade}
              </p>
              <p>
                <strong>Church : </strong>
                {church}
              </p>
            </Card>
          </Col>
          <Col span={6}></Col>
        </Row>
        {/* <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center"
          }}
        ></span> */}
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
        <Row>
          <Col span={6}></Col>
          <Col span={12}></Col>
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

ConfirmVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ConfirmVolunteerDetails);
