import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../layouts/Navbar";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Radio,
  Card,
  Spin,
  Layout
} from "antd";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import { setParticipantDetails } from "../../actions/formActions";
import PropTypes from "prop-types";
import Crane from "../../static/images/crane.png";
import JackHammer from "../../static/images/jackhammer.png";
import Footer from "../layouts/Footer";
import moment from "moment";

const FormParticipantDetails = ({
  nextStep,
  formDetails: { participantDetails, step },
  participant: { loading },
  setParticipantDetails,
  grades
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const { Content } = Layout;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
    //eslint-disable-next-line
  }, []);

  const calculateCurrentAge = date => {
    const now = moment();
    return now.diff(date, "years");
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

  const onDateOfBirthChange = date => {
    const age = calculateCurrentAge(date);
    form.setFieldsValue({
      age: age
    });
    form.validateFields(["age"]);
  };

  const onFinish = fieldsValue => {
    console.log("Success:", fieldsValue);
    const dob = fieldsValue["dateOfBirth"];
    const values = {
      ...fieldsValue,
      dateOfBirth: dob.format("YYYY-MM-DD")
    };
    setParticipantDetails(values);
    nextStep();
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Fragment>
      <Navbar />
      <RegistrationProgressBar
        step={step - 1}
        title="Participant Registration"
      />
      <Content>
        <div className="form-wrapper">
          <Row>
            <Col span={7} xl={7} lg={7} md={7} sm={0} xs={0}>
              <img src={JackHammer} alt="jackhammer" />
            </Col>
            <Col
              span={10}
              xl={10}
              lg={10}
              md={10}
              sm={24}
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Card hoverable="true" style={cardStyle}>
                <Form
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Surname"
                    name="surname"
                    defaultValue={participantDetails.surname}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the child's surname"
                      }
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
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
                    name="firstName"
                    defaultValue={participantDetails.firstName}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the child's first name"
                      }
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
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
                      textAlign: "center"
                    }}
                  ></span>
                  <Form.Item
                    label="Age"
                    name="age"
                    defaultValue={participantDetails.age}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
                    rules={[
                      {
                        validator: isEligibleAge
                      }
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
                        message: "Please select a gender "
                      }
                    ]}
                  >
                    <Radio.Group size="medium">
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
                        message: "Please select a class/grade"
                      }
                    ]}
                  >
                    <Select defaultValue="Class Completed this Past Academic Year">
                      {grades.map(grade => (
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
                    defaultValue={participantDetails.church}
                    rules={[
                      {
                        required: true,
                        message: "Please select/enter the child's home church"
                      }
                    ]}
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
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                          !form.isFieldsTouched(true) ||
                          form
                            .getFieldsError()
                            .filter(({ errors }) => errors.length).length
                        }
                      >
                        Next
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={7} xl={7} lg={7} md={7} sm={0} xs={0}>
              <img src={Crane} alt="crane" />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
    </Fragment>
  );
};

const cardStyle = {
  minWidth: 400,
  maxWidth: 650,
  height: 700,
  borderRadius: "2px"
};

FormParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setParticipantDetails: PropTypes.func.isRequired,
  grades: PropTypes.array.isRequired,
  nextStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant
});

export default connect(mapStateToProps, { setParticipantDetails })(
  FormParticipantDetails
);
