import React, { Fragment } from "react";
import { Card, Form, Input, Button, Row, Col, Alert, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const AddAdmin = () => {
  const { Content } = Layout;

  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Content
        style={{
          minHeight: 800,
          height: "calc(100% - 100px)",
          paddingTop: "100px",
          background: "#f3f5f7"
        }}
      >
        <Row>
          <Col span={2}></Col>
          <Col
            span={20}
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {/* {error && (
              <Alert
                message="Error"
                description="Error"
                type="error"
                showIcon
              />
            )} */}
            <Card hoverable="true" style={cardStyle}>
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
                  type="text"
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name"
                    }
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  type="text"
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name"
                    }
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
                    Add User
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={2}></Col>
        </Row>
      </Content>
    </Fragment>
  );
};

const cardStyle = {
  minWidth: 450,
  height: 500,
  borderRadius: "2px"
};

export default AddAdmin;