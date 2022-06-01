import { DatePicker, Form, Input, Radio, Select, Spin } from "antd";
import React, { Fragment, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGrades } from "../../actions/participantActions";
import moment from "moment";

const EditParticipant = ({
  form,
  record,
  getGrades,
  participant: { grades },
}) => {
  useEffect(() => {
    form.resetFields();
    getGrades();
    //eslint-disable-next-line
  }, []);

  const { TextArea } = Input;
  const { Option } = Select;

  const onDateOfBirthChange = date => {
    const age = calculateCurrentAge(date);
    form.setFieldsValue({
      age: age,
    });
    form.validateFields(["age"]);
  };

  const isEligibleAge = (rule, value) => {
    if (Math.sign(value) === -1 || (value && Math.sign(value) === 0)) {
      return Promise.reject("Please select a birth date in the past");
    }
    if (value < 3) {
      return Promise.reject(
        "Only Children older that 3 years are eligible for registration"
      );
    }
    return Promise.resolve();
  };

  const calculateCurrentAge = date => {
    const now = moment();
    return now.diff(date, "years");
  };

  if (grades == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "50px" }} />
    );
  }

  return (
    <Fragment>
      <Form
        initialValues={{
          ...record,
          date_of_birth: moment(record.date_of_birth),
        }}
        form={form}
      >
        <Form.Item
          label="Surname"
          name="last_name"
          defaultValue={record.last_name}
          rules={[
            {
              required: true,
              message: "Please enter the child's surname",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
        >
          <Input placeholder="Surname" />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center",
          }}
        ></span>
        <Form.Item
          label="First Name"
          name="first_name"
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
          rules={[
            {
              required: true,
              message: "Please enter the child's first name",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
        >
          <DatePicker
            placeholder="Date of Birth"
            allowClear={false}
            onChange={onDateOfBirthChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            textAlign: "center",
          }}
        ></span>
        <Form.Item
          label="Age"
          name="age"
          style={{
            display: "inline-block",
            width: "calc(50% - 12px)",
          }}
          rules={[
            {
              validator: isEligibleAge,
            },
          ]}
        >
          <Input disabled={true} placeholder="Age" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          style={{ display: "inline-block", width: "calc(100%)" }}
          rules={[
            {
              required: true,
              message: "Please select a gender ",
            },
          ]}
        >
          <Radio.Group size="medium" buttonStyle="solid">
            <Radio.Button value="Male">Male</Radio.Button>
            <Radio.Button value="Female">Female</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Class Completed this Past Academic Year"
          name="grade"
          style={{ display: "inline-block", width: "calc(100%)" }}
          rules={[
            {
              required: true,
              message: "Please select a class/grade",
            },
          ]}
        >
          <Select>
            {grades != null &&
              grades.map(grade => (
                <Option key={grade.name} value={grade.name}>
                  {grade.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <br />
        <Form.Item
          label="Home Church"
          name="church"
          style={{ display: "inline-block", width: "calc(100%)" }}
          rules={[
            {
              required: true,
              message: "Please select/enter the child's home church",
            },
          ]}
        >
          <Input placeholder="The church the child attends" />
        </Form.Item>
        <br />
        <Form.Item
          label="Medical Information (Allergies etc.)"
          name="medical_info"
          style={{ display: "inline-block", width: "calc(100%)" }}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <TextArea
            placeholder="Any relevant medical information"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          label="Parent/Guardian Full Name"
          name="parent_name"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter the parent/guardians full name",
            },
          ]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          label="Parent/Guardian Primary Phone Number eg. 024XXXXXXX"
          name="primary_contact_no"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter your primary contact number",
            },
          ]}
        >
          <Input maxLength="10" placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          label="Parent/Guardian Alternate Phone Number eg. 024XXXXXXX"
          name="alternate_contact_no"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter an alternate contact number ",
            },
          ]}
        >
          <Input
            maxLength="10"
            placeholder="Another number we can reach you on"
          />
        </Form.Item>
        <Form.Item
          label="Parent/Guardian WhatsApp Phone Number eg. 024XXXXXXX"
          name="whatsApp_no"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input maxLength="10" placeholder="Your WhatsApp Number, If any" />
        </Form.Item>

        <Form.Item
          label="Parent/Guardian Email"
          name="email"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter a valid email address ",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        {/* <Form.Item
          label="Pickup Person's Name"
          name="pickup_person_name"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter the pickup person's full name",
            },
          ]}
        >
          <Input placeholder="Who will be picking the child up?" />
        </Form.Item>

        <Form.Item
          label="Pickup Person's Phone Number eg. 024XXXXXXX"
          name="pickup_person_contact_no"
          style={{ display: "inline-block", width: "100%" }}
          rules={[
            {
              required: true,
              message: "Please enter the phone number of the pickup person",
            },
          ]}
        >
          <Input maxLength="10" placeholder="Pickup Person's Contact Number" />
        </Form.Item> */}
      </Form>
    </Fragment>
  );
};

EditParticipant.propTypes = {
  participant: PropTypes.object.isRequired,
  getGrades: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  participant: state.participant,
});

export default connect(mapStateToProps, { getGrades })(EditParticipant);
