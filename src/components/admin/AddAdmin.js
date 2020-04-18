import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Layout,
  Spin,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { addAdmin, setLoading } from "../../actions/adminActions";
import PropTypes from "prop-types";

const AddAdmin = ({ admin: { loading, error, success }, addAdmin }) => {
  useEffect(() => {}, []);

  const { Content } = Layout;

  const onFinish = (values) => {
    setLoading();
    addAdmin({ ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const successNotification = () => {
    notification.success({
      message: "Great!",
      description:
        "You have successfully added a new admin. The user can proceed to login to the dashboard",
    });
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (success) {
    successNotification();
  }

  return (
    <Fragment>
      <Content
        style={{
          minHeight: 800,
          height: "calc(100%)",
          paddingTop: "100px",
          background: "#f3f5f7",
        }}
      >
        <Row>
          <Col span={7} xl={7} lg={7} md={7} sm={0} xs={0}></Col>
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
              flexDirection: "column",
            }}
          >
            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            )}
            <Card hoverable="true" style={cardStyle}>
              <Form
                layout="vertical"
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  type="text"
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a first name",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  type="text"
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a last name",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  type="email"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter an email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ fontSize: 13 }} />}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a password",
                    },
                    {
                      min: 5,
                      message:
                        "The password should have a minimum of 5 characters",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ fontSize: 13 }} />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={loading}
                  >
                    Add New Admin
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={7} xl={7} lg={7} md={7} sm={0} xs={0}></Col>
        </Row>
      </Content>
    </Fragment>
  );
};

const cardStyle = {
  // width: 500,
  height: 500,
  borderRadius: "2px",
};

AddAdmin.propTypes = {
  admin: PropTypes.object.isRequired,
  addAdmin: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { addAdmin, setLoading })(AddAdmin);
