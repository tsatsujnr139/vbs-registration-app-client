import React from "react";
import { Spin, Icon, Card } from "antd";
import { Form, Input, Button, Row, Col } from "antd";
import { Fragment } from "react";

const Login = () => {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const onFinish = values => {
    console.log("Success:", values);
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div style={{ marginTop: "100px" }}>
        <Row>
          <Col span={9}></Col>
          <Col span={6}>
            <Card hoverable="true">
              <Form
                layout="vertical"
                // {...layout}
                name="basic"
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!"
                    }
                  ]}
                >
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    }
                  ]}
                >
                  <Input.Password
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Submit
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

export default Login;
