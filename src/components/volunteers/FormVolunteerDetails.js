import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Spin } from "antd/lib";
import { Form, Input, Select, Button, Row, Col, Radio, Card } from "antd";
import RegistrationProgressBar from "./VolunteerRegistrationProgressBar";
import { setVolunteerDetails } from "../../actions/formActions";
import PropTypes from "prop-types";
import Crane from "../../static/images/crane.png";
import JackHammer from "../../static/images/jackhammer.png";
import Navbar from "../layouts/Navbar";

const FormVolunteerDetails = ({
  nextStep,
  formDetails: { volunteerDetails, step },
  participant: { loading },
  setVolunteerDetails,
  grades
}) => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
    //eslint-disable-next-line
  }, []);

  const onFinish = values => {
    console.log("Success:", values);
    setVolunteerDetails(values);
    nextStep();
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  }

  return (
    <Fragment>
      <Navbar />
      <RegistrationProgressBar step={step - 1} title="Volunteer Registration" />
      <div className="form-wrapper">
        <Row>
          <Col span={5} xl={5} lg={5} md={5} sm={2} xs={2}>
            <img src={JackHammer} alt="jackhammer" />
          </Col>
          <Col
            span={14}
            xl={14}
            lg={14}
            md={14}
            sm={20}
            xs={20}
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
                  defaultValue={volunteerDetails.surname}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your surname"
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
                  defaultValue={volunteerDetails.firstName}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 12px)"
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter the your first name"
                    }
                  ]}
                >
                  <Input placeholder="First Name" />
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
                  label="Phone Number eg. 024XXXXXXX"
                  name="phone"
                  style={{ display: "inline-block", width: "100%" }}
                  defaultValue={volunteerDetails.phone}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number"
                    }
                  ]}
                >
                  <Input maxLength="10" placeholder="Phone Number" />
                </Form.Item>
                <Form.Item
                  label="WhatsApp Phone Number eg. 024XXXXXXX"
                  name="whatsAppPhone"
                  style={{ display: "inline-block", width: "100%" }}
                  defaultValue={volunteerDetails.whatsAppPhone}
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <Input maxLength="10" placeholder="WhatsApp Number If Any" />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="email"
                  style={{ display: "inline-block", width: "100%" }}
                  defaultValue={volunteerDetails.email}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid email address "
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address"
                    }
                  ]}
                >
                  <Input placeholder="Email Address" />
                </Form.Item>
                <Form.Item
                  label="Preferred Class (Preferred class not guaranteed)"
                  name="grade"
                  style={{ display: "inline-block", width: "calc(100%)" }}
                  rules={[
                    {
                      required: true,
                      message: "Please select a class/grade"
                    }
                  ]}
                >
                  <Select defaultValue="Class">
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
                  defaultValue={volunteerDetails.church}
                  rules={[
                    {
                      required: true,
                      message: "Please select/enter home church"
                    }
                  ]}
                >
                  <Input placeholder="Your home church" />
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
          <Col span={5} xl={5} lg={5} md={5} sm={2} xs={2}>
            <img src={Crane} alt="crane" />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const cardStyle = {
  minWidth: 400,
  maxWidth: 650,
  height: 700,
  borderRadius: "2px"
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
  FormVolunteerDetails
);
