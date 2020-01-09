import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, DatePicker, Button } from "antd";
import setStep from "../../reducers/formReducer";
import PropTypes from "prop-types";

const FormParticipantDetails = ({ form: { step, loading }, setStep }) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const handleNextClick = e => {
    e.preventDefault();
  };

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle field change
  const handleChange = input => e => {};

  return (
    <Fragment>
      <Form layout="horizontal">
        <Form.Item
          label="Surname"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
        >
          <Input placeholder="Surname" />
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
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)"
          }}
        >
          <DatePicker />
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
          style={{ display: "inline-block", width: "calc(100%)" }}
        >
          <Input placeholder="The church the child attends" />
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
          <Button type="primary">Next</Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

FormParticipantDetails.propTypes = {
  form: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, { setStep })(FormParticipantDetails);
