import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import { setGuardianDetails } from "../../actions/formActions";
import RegistrationProgressBar from "./RegistrationProgressBar";
import PropTypes from "prop-types";

const FormGuardianDetails = ({
  nextStep,
  prevStep,
  formDetails: { guardianDetails, step },
  setGuardianDetails,
  form
}) => {
  const {
    getFieldDecorator,
    validateFields,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = form;

  useEffect(() => {
    validateFields();
    //eslint-disable-next-line
  }, []);

  const fullNameError = isFieldTouched("fullName") && getFieldError("fullName");
  const phoneError = isFieldTouched("phone") && getFieldError("phone");
  const alternatePhoneError =
    isFieldTouched("alternatePhone") && getFieldError("alternatePhone");
  const pickUpPersonNameError =
    isFieldTouched("pickUpPersonName") && getFieldError("pickUpPersonName");
  const pickUpPersonPhoneError =
    isFieldTouched("pickUpPersonPhone") && getFieldError("pickUpPersonPhone");

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const validateInputAndSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setGuardianDetails(values);
        nextStep();
      }
    });
  };

  return (
    <Fragment>
      <RegistrationProgressBar step={step - 1} />
      <div className="form-wrapper">
        <Row>
          <Col span={8}></Col>
          <Col span={8} style={{ display: "block" }}>
            <Form layout="horizontal" onSubmit={validateInputAndSubmit}>
              <Form.Item
                label="Parent/Guardian Full Name"
                validateStatus={fullNameError ? "error" : ""}
                help={fullNameError || ""}
                style={{ display: "inline-block", width: "100%" }}
              >
                {getFieldDecorator("surname", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter the parent/guardians full name"
                    }
                  ],
                  initialValue: guardianDetails.fullName
                })(<Input placeholder="Full Name" />)}
              </Form.Item>

              <Form.Item
                label="Parent/Guardian Primary Phone Number eg. 024XXXXXXX"
                validateStatus={phoneError ? "error" : ""}
                help={phoneError || ""}
                style={{ display: "inline-block", width: "100%" }}
              >
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter your primary contact number"
                    }
                  ],
                  initialValue: guardianDetails.phone
                })(<Input placeholder="Phone Number" />)}
              </Form.Item>

              <Form.Item
                label="Parent/Guardian Alternate Phone Number eg. 024XXXXXXX"
                validateStatus={alternatePhoneError ? "error" : ""}
                help={alternatePhoneError || ""}
                style={{ display: "inline-block", width: "100%" }}
              >
                {getFieldDecorator("alternatePhone", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter a valid alternate contact number "
                    }
                  ],
                  initialValue: guardianDetails.alternatePhone
                })(<Input placeholder="Another number we can reach you on" />)}
              </Form.Item>

              <Form.Item
                label="Pickup Person's Name"
                validateStatus={pickUpPersonNameError ? "error" : ""}
                help={pickUpPersonNameError || ""}
                style={{ display: "inline-block", width: "100%" }}
              >
                {getFieldDecorator("pickupPersonName", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter the pickup person's full name"
                    }
                  ],
                  initialValue: guardianDetails.pickupPersonName
                })(<Input placeholder="Who will be picking the child up?" />)}
              </Form.Item>

              <Form.Item
                label="Pickup Person's Phone Number eg. 024XXXXXXX"
                validateStatus={pickUpPersonPhoneError ? "error" : ""}
                help={pickUpPersonPhoneError || ""}
                style={{ display: "inline-block", width: "100%" }}
              >
                {getFieldDecorator("pickupPersonPhone", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please enter the phone number of the pickup person"
                    }
                  ],
                  initialValue: guardianDetails.pickupPersonPhone
                })(<Input placeholder="Pickup Person's Contact Number" />)}
              </Form.Item>
              <Button
                type="default"
                onClick={prevStep}
                disabled={hasErrors(getFieldsError())}
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Next
              </Button>
            </Form>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </Fragment>
  );
};

FormGuardianDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setGuardianDetails: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

export default connect(mapStateToProps, { setGuardianDetails })(
  Form.create()(FormGuardianDetails)
);
