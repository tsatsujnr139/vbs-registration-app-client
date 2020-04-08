import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Descriptions, Modal } from "antd";
import RegistrationProgressBar from "./VolunteerRegistrationProgressBar";
import Bulldozer from "../../static/images/bulldozer.png";
import Excavator from "../../static/images/excavator.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { registerVolunteer } from "../../actions/volunteerActions";

const ConfirmVolunteerDetails = ({
  nextStep,
  prevStep,
  formDetails: { volunteerDetails },
  formDetails: {
    volunteerDetails: {
      surname,
      firstName,
      role,
      phoneNumber,
      whatsAppNumber,
      email,
      gender,
      preferredGrade,
      church,
      previousVolunteer,
      volunteerSite
    },
    step
  },
  volunteer: { error },
  registerVolunteer
}) => {
  useEffect(() => {}, [error]);

  const onConfirm = volunteerDetails => {
    // register the volunteer
    registerVolunteer(volunteerDetails);
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
            <Bulldozer />
          </Col>
          <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
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
              <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
              <Descriptions.Item label="Preferred Role">
                {role}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="WhatsApp Number">
                {whatsAppNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{email}</Descriptions.Item>
              <Descriptions.Item label="Preferred Class">
                {preferredGrade}
              </Descriptions.Item>
              <Descriptions.Item label="Church" span={3}>
                {church}
              </Descriptions.Item>
              <Descriptions.Item label="Previous Volunteer">
                {previousVolunteer}
              </Descriptions.Item>
              <Descriptions.Item label="Previous Volunteer Site">
                {volunteerSite}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}>
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
          <Button
            size="large"
            type="primary"
            onClick={() => onConfirm(volunteerDetails)}
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
  volunteer: state.volunteer
});

ConfirmVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerVolunteer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { registerVolunteer })(
  ConfirmVolunteerDetails
);
