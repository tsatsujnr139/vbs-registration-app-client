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
  Layout,
  Result,
} from "antd";
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar";
import { setParticipantDetails } from "../../actions/formActions";
import PropTypes from "prop-types";
import CoinLogo from "../../static/images/coin-logo.png";
import Drone from "../../static/images/drone.png";
import Footer from "../layouts/Footer";
import moment from "moment";
import { getGrades, getSessions } from "../../actions/participantActions";
import { Typography } from "antd";

const FormParticipantDetails = ({
  nextStep,
  formDetails: { participantDetails, step },
  participant: { loading, grades, sessions, error },
  setParticipantDetails,
  getGrades,
  getSessions,
}) => {
  const { Option } = Select;
  const { Content } = Layout;
  const { Text } = Typography;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    getGrades();
    getSessions();
    forceUpdate({});
    //eslint-disable-next-line
  }, []);

  const calculateCurrentAge = (date) => {
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

  const onDateOfBirthChange = (date) => {
    const age = calculateCurrentAge(date);
    form.setFieldsValue({
      age: age,
    });
    form.validateFields(["age"]);
  };

  const onGradeChange = (value) => {
    console.log("grade selected", value);
    const values = {
      grade: value,
    };
    setParticipantDetails(values);
  };

  const onSessionChange = (value) => {
    var selected_session = sessions.filter(
      (session) => session.id === value
    )[0];
    const values = {
      session: selected_session,
    };
    setParticipantDetails(values);
  };

  const onFinish = (fieldsValue) => {
    const dob = fieldsValue["date_of_birth"];
    let attendance_type_id = fieldsValue["attendance_type"];
    console.log("attendance type id", attendance_type_id)
    let attendance_type = null;
    if (attendance_type_id !== undefined) {
      attendance_type =
        participantDetails.session.supported_attendance_types.filter(
          (supported_attendance_type) =>
            supported_attendance_type.id === attendance_type_id
        )[0];
    } else {
      attendance_type =
        participantDetails.session.supported_attendance_types[0];
    }
    const values = {
      ...fieldsValue,
      attendance_type: attendance_type,
      session: participantDetails.session,
      date_of_birth: dob.format("YYYY-MM-DD"),
    };
    setParticipantDetails(values);
    nextStep();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Something went wrong. We're trying to figure it out. Please try again later"
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    );
  }

  if (loading || grades == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    );
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
              <img src={Drone} alt="drone... buzz buzz" />
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
                justifyContent: "center",
              }}
            >
              <Card hoverable="true" style={cardStyle}>
                <Form
                  initialValues={{
                    remember: true,
                  }}
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Surname"
                    name="last_name"
                    defaultValue={participantDetails.last_name}
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
                    defaultValue={participantDetails.first_name}
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
                    defaultValue={participantDetails.age}
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
                    <Select
                      onChange={onGradeChange}
                      defaultValue="Class Completed this Past Academic Year"
                    >
                      {grades.map((grade) => (
                        <Option key={grade.name} value={grade.name}>
                          {grade.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <br />
                  {participantDetails.grade && (
                    <Form.Item
                      label="Session you would like to attend"
                      name="session"
                      style={{ display: "inline-block", width: "calc(100%)" }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a session",
                        },
                      ]}
                    >
                      <Select
                        onChange={onSessionChange}
                        defaultValue="Which session would you like to register for?"
                      >
                        {sessions
                          .filter((session) =>
                            session.eligible_grades.some(
                              (eligible_grade) =>
                                eligible_grade.name === participantDetails.grade
                            )
                          )
                          .map((filteredSession) => (
                            <Option
                              key={filteredSession.id}
                              value={filteredSession.id}
                            >
                              {filteredSession.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  )}
                  {participantDetails.session &&
                    participantDetails.session.supported_attendance_types
                      .length > 1 && (
                      <Form.Item
                        label="How will you be attending?"
                        name="attendance_type"
                        style={{ display: "inline-block", width: "calc(100%)" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select an option",
                          },
                        ]}
                      >
                        <Radio.Group size="Large" buttonStyle="solid">
                          {participantDetails.session.supported_attendance_types.map(
                            (attendance_type) => (
                              <Radio.Button value={attendance_type.id}>
                                {attendance_type.name}
                              </Radio.Button>
                            )
                          )}
                        </Radio.Group>
                      </Form.Item>
                    )}
                  {participantDetails.session &&
                    participantDetails.session.supported_attendance_types
                      .length === 1 && (
                      <Text
                        style={{
                          marginLeft: "calc(8%)",
                          display: "inline-block",
                        }}
                        type="danger"
                      >
                        *Kinldy Note That This Session Is Available As a{" "}
                        <Text underline strong type="danger">
                          {participantDetails.session.supported_attendance_types[0].name.toUpperCase()}
                        </Text>{" "}
                        Option Only*
                      </Text>
                    )}
                  <Form.Item
                    label="Home Church"
                    name="church"
                    style={{ display: "inline-block", width: "calc(100%)" }}
                    defaultValue={participantDetails.church}
                    rules={[
                      {
                        required: true,
                        message: "Please select/enter the child's home church",
                      },
                    ]}
                  >
                    <Input placeholder="The church the child attends" />
                  </Form.Item>
                  {/* <br />
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
                  </Form.Item> */}
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
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
            <Col
              style={{ overflow: "hidden" }}
              span={7}
              xl={7}
              lg={7}
              md={7}
              sm={0}
              xs={0}
            >
              <img src={CoinLogo} alt="Coinssssss" />
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
  borderRadius: "2px",
};

FormParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setParticipantDetails: PropTypes.func.isRequired,
  getGrades: PropTypes.func.isRequired,
  getSessions: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant,
});

export default connect(mapStateToProps, {
  setParticipantDetails,
  getGrades,
  getSessions,
})(FormParticipantDetails);
