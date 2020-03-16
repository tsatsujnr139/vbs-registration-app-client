import React from "react";
import { connect } from "react-redux";
import { Spin, Card, Form, Input, Button, Row, Col, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Fragment, useEffect } from "react";
import { login } from "../../actions/authActions";
import PropTypes from "prop-types";
import Navbar from "../layouts/Navbar";

const Login = props => {
  const {
    auth: { loading, isAuthenticated, error },
    login,
    history
  } = props;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/admin/dashboard");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onFinish = values => {
    console.log("Success:", values);
    login({ ...values });
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
      <div style={{ marginTop: "100px" }}>
        <Row>
          <Col span={9}></Col>
          <Col span={6}>
            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            )}
            <Card hoverable="true">
              <Form
                layout="vertical"
                name="basic"
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  type="email"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!"
                    }
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
                      message: "Please enter your password!"
                    }
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
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
