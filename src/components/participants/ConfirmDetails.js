import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Card, PageHeader } from "antd";
import RegistrationProgressBar from "./RegistrationProgressBar";

const ConfirmDetails = ({
  nextStep,
  prevStep,
  formDetails: { participantDetails, guardianDetails, step }
}) => {
  return (
    <Fragment>
      <RegistrationProgressBar
        step={step - 1}
        title="Please Confirm Your Details"
      />
      <div style={{ background: "#f3f5f7", padding: "30px" }}>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
            <Card title="PARTICIPANT DETAILS" hoverable={true}>
              <p>
                <strong>Surname: </strong>Adjorlolo
              </p>
              <p>
                <strong>First Name: </strong> Kofi
              </p>
            </Card>
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    </Fragment>
  );
};

const gridStyle = {
  width: "25%",
  textAlign: "center"
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

ConfirmDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(ConfirmDetails);
