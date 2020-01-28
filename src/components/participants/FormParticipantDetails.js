import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Radio,
  Card
} from "antd";
import RegistrationProgressBar from "./RegistrationProgressBar";
import { setParticipantDetails } from "../../actions/formActions";
import { getGrades } from "../../actions/participantActions";
import PropTypes from "prop-types";
import Crane from "../../static/images/crane.png";
import JackHammer from "../../static/images/jackhammer.png";
import moment from "moment";

const FormParticipantDetails = ({
  nextStep,
  formDetails: { participantDetails, step },
  participant: { grades, loading },
  setParticipantDetails,
  getGrades,
  form
}) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const {
    getFieldDecorator,
    validateFields,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = form;

  useEffect(() => {
    validateFields();
    getGrades();
    //eslint-disable-next-line
  }, []);

  const calculateCurrentAge = date => {
    const now = moment();
    return now.diff(date, "years");
  };

  const isEligibleAge = (rule, value, callback) => {
    if (Math.sign(value) === -1 || (value && Math.sign(value) === 0)) {
      callback("Please select a birth date in the past");
    }
    if (value && value < 3) {
      callback(
        "Only Children older that 3 years are eligible for registration"
      );
    }
    callback();
  };

  const surnameError = isFieldTouched("surname") && getFieldError("surname");
  const firstNameError =
    isFieldTouched("firstName") && getFieldError("firstName");
  const churchError = isFieldTouched("church") && getFieldError("church");
  const genderError = isFieldTouched("gender") && getFieldError("gender");

  const ageError = getFieldError("age");

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const onChange = date => {
    const age = calculateCurrentAge(date);
    form.setFields({
      age: {
        value: age
      }
    });
    validateFields(["age"]);
  };

  const validateInputAndSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        setParticipantDetails(values);
        nextStep();
      }
    });
  };

  if (loading || grades === null) {
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
                    initialValue: participantDetails.surname
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
                    initialValue: participantDetails.firstName
                  })(<Input placeholder="First Name" />)}
                </Form.Item>

                <Form.Item
                  label="Date of Birth"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)"
                  }}
                >
                  <DatePicker onChange={onChange} style={{ width: "100%" }} />
                </Form.Item>
                <span
                  style={{
                    display: "inline-block",
                    width: "24px",
                    textAlign: "center"
                  }}
                ></span>
                <Form.Item
                  label="Age"
                  help={ageError || ""}
                  hasFeedback
                  validateStatus={ageError ? "error" : ""}
                  style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                >
                  {getFieldDecorator("age", {
                    rules: [
                      // {
                      //   message:
                      //     "Only children older than 3 years are eligible to register"
                      // },
                      {
                        validator: isEligibleAge
                      }
                    ],
                    initialValue: participantDetails.age
                  })(<Input placeholder="Age" />)}
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
                  label="Class Completed This Past Academic Year"
                  style={{ display: "inline-block", width: "calc(100%)" }}
                >
                  {getFieldDecorator("grade", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a class/grade"
                      }
                    ],
                    initialValue: participantDetails.grade
                  })(
                    <Select defaultValue="Class Completed this past academic year">
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
                        message: "Please enter the child's home church"
                      }
                    ],
                    initialValue: participantDetails.church
                  })(<Input placeholder="The church the child attends" />)}
                </Form.Item>
                <br />
                <Form.Item
                  label="Medical Information (Allergies etc.)"
                  style={{ display: "inline-block", width: "calc(100%)" }}
                >
                  <TextArea
                    placeholder="Any relevant medical information"
                    autoSize={{ minRows: 5, maxRows: 6 }}
                  />
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

FormParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setParticipantDetails: PropTypes.func.isRequired,
  getGrades: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant
});

export default connect(mapStateToProps, { setParticipantDetails, getGrades })(
  Form.create()(FormParticipantDetails)
);
