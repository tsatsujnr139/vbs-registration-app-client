import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Radio, Spin } from "antd";
import { getGrades } from "../../actions/participantActions";
import { getRoles } from "../../actions/volunteerActions";
import PropTypes from "prop-types";

const EditVolunteer = ({
  form,
  record,
  getGrades,
  getRoles,
  participant: { grades },
  volunteer: { roles },
}) => {
  useEffect(() => {
    getRoles();
    getGrades();
    //eslint-disable-next-line
  }, [record]);
  const { Option } = Select;

  if (grades == null || roles == null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "50px" }} />
    );
  }
  return (
    <Fragment>
      <Form
        initialValues={{
          ...record,
          previous_volunteer:
            record.previous_volunteer === true ? "true" : "false",
        }}
        form={form}
      >
        <Form.Item
          label="Surname"
          name="last_name"
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
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input maxLength="10" placeholder="WhatsApp Number If Any" />
        </Form.Item>
        <Form.Item
          label="Email Address"
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
            {roles != null &&
              roles.map((role) => (
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
          label="Previous VBS Volunteer"
          name="previous_volunteer"
          style={{ display: "inline-block", width: "calc(100%)" }}
          rules={[
            {
              required: true,
              message: "Please select an option",
            },
          ]}
        >
          <Radio.Group size="medium" buttonStyle="solid">
            <Radio.Button value="true">Yes</Radio.Button>
            <Radio.Button value="false">No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Previous Volunteer Site"
          name="previous_site"
          style={{
            display: "inline-block",
            width: "calc(100%)",
          }}
        >
          <Input placeholder="Which site/role did you volunteer with" />
        </Form.Item>
      </Form>
    </Fragment>
  );
};

EditVolunteer.propTypes = {
  getGrades: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  participant: state.participant,
  volunteer: state.volunteer,
});

export default connect(mapStateToProps, {
  getGrades,
  getRoles,
})(EditVolunteer);
