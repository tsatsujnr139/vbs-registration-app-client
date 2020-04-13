import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Radio,
  Card,
  Layout,
  Spin,
} from "antd";
import RegistrationProgressBar from "./VolunteerRegistrationProgressBar";
import { setVolunteerDetails } from "../../actions/formActions";
import PropTypes from "prop-types";
import Crane from "../../static/images/crane.png";
import JackHammer from "../../static/images/jackhammer.png";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { getGrades } from "../../actions/participantActions";
import { getRoles } from "../../actions/volunteerActions";

const FormVolunteerDetails = ({
  nextStep,
  formDetails: { volunteerDetails, step },
  participant: { loading, grades },
  volunteer: { roles },
  setVolunteerDetails,
  getGrades,
  getRoles,
}) => {
  const { Option } = Select;
  const { Content } = Layout;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
    getGrades();
    getRoles();
    //eslint-disable-next-line
  }, []);

  const onFinish = (values) => {
    setVolunteerDetails(values);
    nextStep();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPreviousVolunteerChange = (e) => {
    console.log("radio checked", e.target.value);
    const values = {
      previous_volunteer: e.target.value,
    };
    setVolunteerDetails(values);
  };

  if (loading || grades == null || roles == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    );
  }

  return (
    <Fragment>
      <Navbar />
      <Content>
        <RegistrationProgressBar
          step={step - 1}
          title="Volunteer Registration"
        />
        <Col>
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
                  justifyContent: "center",
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
                      name="last_name"
                      defaultValue={volunteerDetails.last_name}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your surname",
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
                      defaultValue={volunteerDetails.first_name}
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 12px)",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the your first name",
                        },
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
                      label="Phone Number eg. 024XXXXXXX"
                      name="contact_no"
                      style={{ display: "inline-block", width: "100%" }}
                      defaultValue={volunteerDetails.contact_no}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input maxLength="10" placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                      label="WhatsApp Phone Number eg. 024XXXXXXX"
                      name="whatsApp_no"
                      style={{ display: "inline-block", width: "100%" }}
                      defaultValue={volunteerDetails.whatsApp_no}
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input
                        maxLength="10"
                        placeholder="WhatsApp Number If Any"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      style={{ display: "inline-block", width: "100%" }}
                      defaultValue={volunteerDetails.email}
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
                    <Form.Item
                      label="Preferred Role"
                      name="preferred_role"
                      style={{ display: "inline-block", width: "calc(100%)" }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a preferred role",
                        },
                      ]}
                    >
                      <Select defaultValue="Preferred Role">
                        {roles.map((role) => (
                          <Option key={role.name} value={role.name}>
                            {role.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Preferred Class (Preferred class not guaranteed)"
                      name="preferred_class"
                      style={{ display: "inline-block", width: "calc(100%)" }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a class/grade",
                        },
                      ]}
                    >
                      <Select defaultValue="Preferred Class">
                        {grades.map((grade) => (
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
                          message: "Please select/enter home church",
                        },
                      ]}
                    >
                      <Input placeholder="Your home church" />
                    </Form.Item>
                    <Form.Item
                      label="Have you volunteered for VBS before"
                      name="previous_volunteer"
                      style={{ display: "inline-block", width: "calc(100%)" }}
                      rules={[
                        {
                          required: true,
                          message: "Please select an option",
                        },
                      ]}
                    >
                      <Radio.Group
                        size="medium"
                        onChange={onPreviousVolunteerChange}
                        buttonStyle="solid"
                      >
                        <Radio.Button value="True">Yes</Radio.Button>
                        <Radio.Button value="False">No</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    {volunteerDetails.previous_volunteer === "True" && (
                      <Form.Item
                        label="Which role/site/class did you volunteer with"
                        name="previous_site"
                        defaultValue={volunteerDetails.previous_site}
                        style={{
                          display: "inline-block",
                          width: "calc(100%)",
                        }}
                        rules={[
                          {
                            required: true,
                            message:
                              "Please enter the site you volunteered with",
                          },
                        ]}
                      >
                        <Input placeholder="Which site/role did you volunteer with" />
                      </Form.Item>
                    )}
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
              <Col
                style={{ overflow: "hidden" }}
                span={7}
                xl={7}
                lg={7}
                md={7}
                sm={0}
                xs={0}
              >
                <img src={Crane} alt="crane" />
              </Col>
            </Row>
          </div>
        </Col>
      </Content>
      <Footer />
    </Fragment>
  );
};

const cardStyle = {
  minWidth: 400,
  maxWidth: 650,
  height: 950,
  borderRadius: "2px",
};

FormVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setVolunteerDetails: PropTypes.func.isRequired,
  getGrades: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant,
  volunteer: state.volunteer,
});

export default connect(mapStateToProps, {
  setVolunteerDetails,
  getGrades,
  getRoles,
})(FormVolunteerDetails);
