import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { Form, Input, Select, Button, Row, Col, Radio, Card } from "antd";
import RegistrationProgressBar from "./VolunteerRegistrationProgressBar";
import { setVolunteerDetails } from "../../actions/formActions";
import PropTypes from "prop-types";
import Crane from "../../static/images/crane.png";
import JackHammer from "../../static/images/jackhammer.png";

const FormVolunteerDetails = ({
  nextStep,
  formDetails: { volunteerDetails, step },
  participant: { loading },
  setVolunteerDetails,
  grades,
  form
}) => {
  const { Option } = Select;

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

  const surnameError = isFieldTouched("surname") && getFieldError("surname");
  const firstNameError =
    isFieldTouched("firstName") && getFieldError("firstName");
  const churchError = isFieldTouched("church") && getFieldError("church");
  const genderError = isFieldTouched("gender") && getFieldError("gender");
  const phoneError = isFieldTouched("phone") && getFieldError("phone");
  const emailError = isFieldTouched("email") && getFieldError("email");
  const gradeError =
    isFieldTouched("preferredGrade") && getFieldError("preferredGrade");

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const validateInputAndSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setVolunteerDetails(values);
        nextStep();
      }
    });
  };

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  }

  return (
    <Fragment>
      <RegistrationProgressBar
        step={step - 1}
        title="Let's get you registered"
      />
      <div className="form-wrapper">
        <Row>
          <Col span={7}>
            <img src={JackHammer} alt="jackhammer" />
          </Col>
          <Col span={10} style={{ display: "block" }}>
            <Card>
              <Form layout="horizontal" onSubmit={validateInputAndSubmit}>
                <Form.Item
                  label="Surname"
                  validateStatus={surnameError ? "error" : ""}
                  help={surnameError || ""}
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  {getFieldDecorator("surname", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter the child's surname"
                      }
                    ],
                    initialValue: volunteerDetails.surname
                  })(<Input placeholder="Surname" />)}
                </Form.Item>
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    textAlign: "center"
                  }}
                ></span>
                <Form.Item
                  label="First Name"
                  validateStatus={firstNameError ? "error" : ""}
                  help={firstNameError || ""}
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  {getFieldDecorator("firstName", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter the child's first name"
                      }
                    ],
                    initialValue: volunteerDetails.firstName
                  })(<Input placeholder="First Name" />)}
                </Form.Item>

                <Form.Item
                  label="Gender"
                  help={genderError || ""}
                  validateStatus={genderError ? "error" : ""}
                  style={{ display: "inline-block", width: "calc(100%)" }}
                >
                  {getFieldDecorator("gender", {
                    rules: [
                      {
                        required: true,
                        message: " "
                      }
                    ]
                  })(
                    <Radio.Group size="medium">
                      <Radio.Button value="Male">Male</Radio.Button>
                      <Radio.Button value="Female">Female</Radio.Button>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item
                  label="Phone Number eg. 024XXXXXXX"
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
                    initialValue: volunteerDetails.phone
                  })(<Input maxLength="10" placeholder="Phone Number" />)}
                </Form.Item>
                <Form.Item
                  label="WhatsApp Number"
                  validateStatus={phoneError ? "error" : ""}
                  help={phoneError || ""}
                  style={{ display: "inline-block", width: "100%" }}
                >
                  {getFieldDecorator("whatsAppPhone", {
                    rules: [],
                    initialValue: volunteerDetails.phone
                  })(
                    <Input
                      maxLength="10"
                      placeholder="Your whatsapp number if any"
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Your Email Address"
                  validateStatus={emailError ? "error" : ""}
                  help={emailError || ""}
                  style={{ display: "inline-block", width: "100%" }}
                >
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter a valid email address "
                      },
                      {
                        type: "email",
                        message: "Please enter a valid email address"
                      }
                    ],
                    initialValue: volunteerDetails.email
                  })(<Input placeholder="Email Address" />)}
                </Form.Item>
                <Form.Item
                  label="Preferred Class (Preferred class not guaranteed)"
                  validateStatus={gradeError ? "error" : ""}
                  help={gradeError || ""}
                  style={{ display: "inline-block", width: "calc(100%)" }}
                >
                  {getFieldDecorator("preferredGrade", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a class/grade"
                      }
                    ],
                    initialValue: volunteerDetails.preferredGrade
                  })(
                    <Select defaultValue="Which class would you like to serve in">
                      {grades.map(grade => (
                        <Option key={grade.name} value={grade.name}>
                          {grade.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <br />
                <Form.Item
                  label="Home Church"
                  validateStatus={churchError ? "error" : ""}
                  help={churchError || ""}
                  style={{ display: "inline-block", width: "calc(100%)" }}
                >
                  {getFieldDecorator("church", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your home church"
                      }
                    ],
                    initialValue: volunteerDetails.church
                  })(<Input placeholder="Your home church" />)}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={7}></Col>
          <img src={Crane} alt="crane" />
        </Row>
      </div>
    </Fragment>
  );
};

FormVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setVolunteerDetails: PropTypes.func.isRequired,
  grades: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant
});

export default connect(mapStateToProps, { setVolunteerDetails })(
  Form.create()(FormVolunteerDetails)
);
