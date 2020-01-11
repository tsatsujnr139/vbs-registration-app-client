import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, DatePicker, Button, Row, Col } from "antd";
import RegistrationProgressBar from "./RegistrationProgressBar";
import { setParticipantDetails } from "../../actions/formActions";
import PropTypes from "prop-types";

const FormParticipantDetails = ({
  nextStep,
  formDetails: { participantDetails, step },
  setParticipantDetails,
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
    //eslint-disable-next-line
  }, []);

  const surnameError = isFieldTouched("surname") && getFieldError("surname");
  const firstNameError =
    isFieldTouched("firstName") && getFieldError("firstName");
  const churchError = isFieldTouched("church") && getFieldError("church");

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
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

  return (
    <Fragment>
      <RegistrationProgressBar step={step - 1} />
      <div className="form-wrapper">
        <Row>
          <Col span={8}></Col>
          <Col span={8} style={{ display: "block" }}>
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
                <DatePicker style={{ width: "100%" }} />
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
                style={{ display: "inline-block", width: "calc(50% - 12px)" }}
              >
                <Input placeholder="Age" />
              </Form.Item>
              <Form.Item
                label="Gender"
                style={{ display: "inline-block", width: "calc(100%)" }}
              >
                <Select defaultValue="male">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Class"
                style={{ display: "inline-block", width: "calc(100%)" }}
              >
                <Select defaultValue="Class Completed this past academic year">
                  <Option value="Class 1">Class 1</Option>
                  <Option value="Class 2">Class 2</Option>
                </Select>
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
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
    </Fragment>
  );
};

FormParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setParticipantDetails: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

export default connect(mapStateToProps, { setParticipantDetails })(
  Form.create()(FormParticipantDetails)
);
