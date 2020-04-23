import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Descriptions, Modal, Spin, Card } from "antd";
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
      last_name,
      first_name,
      contact_no,
      whatsApp_no,
      email,
      gender,
      preferred_role,
      preferred_class,
      church,
      previous_volunteer,
      previous_site,
    },
    step,
  },
  volunteer: { error, loading, success },
  registerVolunteer,
}) => {
  useEffect(() => {
    if (error) {
      errorAlert();
    }
    if (success) {
      nextStep();
    }
  });

  const onConfirm = (volunteerDetails) => {
    // register the volunteer
    const values = {
      ...volunteerDetails,
    };
    registerVolunteer({ ...values });
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
                title="Volunteer Details"
                layout="vertical"
                size="default"
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
              >
                <Descriptions.Item label="Surname" span={2}>
                  {last_name}
                </Descriptions.Item>
                <Descriptions.Item label="First Name">
                  {first_name}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {contact_no}
                </Descriptions.Item>
                <Descriptions.Item label="WhatsApp Number">
                  {whatsApp_no}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Preferred Role">
                  {preferred_role}
                </Descriptions.Item>
                <Descriptions.Item label="Preferred Class">
                  {preferred_class}
                </Descriptions.Item>
                <Descriptions.Item label="Church" span={3}>
                  {church}
                </Descriptions.Item>
                <Descriptions.Item label="Previous Volunteer" span={1}>
                  {previous_volunteer ? "Yes" : "No"}
                </Descriptions.Item>
                {previous_volunteer && (
                  <Descriptions.Item label="Previous Volunteer Site" span={2}>
                    {previous_site}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
          <Col span={6} xl={6} lg={6} md={6} sm={0} xs={0}>
            <img src={Excavator} alt="" />
          </Col>
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

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  volunteer: state.volunteer,
});

ConfirmVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerVolunteer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerVolunteer })(
  ConfirmVolunteerDetails
);
