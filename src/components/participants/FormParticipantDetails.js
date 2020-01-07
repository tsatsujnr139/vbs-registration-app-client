import React, { Fragment } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";

const FormParticipantDetails = () => {
  const { Option } = Select;
  const { TextArea } = Input;
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
          label="Gender"
          style={{ display: "inline-block", width: "calc(30%)" }}
        >
          <Select defaultValue="male">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "75px",
            textAlign: "center"
          }}
        ></span>
        <Form.Item
          label="Date of Birth"
          style={{
            display: "inline-block",
            width: "calc(30%)"
          }}
        >
          <DatePicker />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            textAlign: "center"
          }}
        ></span>
        <Form.Item
          label="Age"
          style={{ display: "inline-block", width: "calc(30%)" }}
        >
          <Input placeholder="Age" />
        </Form.Item>
        <Form.Item
          label="Class"
          style={{ display: "inline-block", width: "calc(45%)" }}
        >
          <Select defaultValue="Class Completed this past academic year">
            <Option value="Class 1">Class 1</Option>
            <Option value="Class 2">Class 2</Option>
          </Select>
        </Form.Item>
        <br />
        <Form.Item
          label="Home Church"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
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

export default FormParticipantDetails;
