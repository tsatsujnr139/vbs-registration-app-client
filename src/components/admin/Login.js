import React from "react";
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
  Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Fragment, useEffect } from "react";
import { login, setLoading, clearErrors } from "../../actions/authActions";
import PropTypes from "prop-types";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

const Login = (props) => {
  const {
    auth: { loading, isAuthenticated, error },
    login,
    setLoading,
    clearErrors,
    history,
  } = props;

  const { Content } = Layout;
  const { Title } = Typography;

  useEffect(() => {
    clearErrors();
    if (isAuthenticated) {
      history.push("/admin/dashboard");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, history]);

  const onFinish = (values) => {
    setLoading();
    login({ ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <Navbar />
      <Content
        style={{
          minHeight: 900,
          paddingTop: "100px",
          background: "#f3f5f7",
        }}
      >
        <Row>
          <Col span={9} xl={9} lg={9} md={7} sm={7} xs={2}>
            {/* <img src={AdminLogin} alt="" /> */}
          </Col>
          <Col
            span={6}
            xl={6}
            lg={6}
            md={10}
            sm={10}
            xs={20}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="section-title">
              <Title level={3}>Admin Login</Title>
            </div>
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
                  type="email"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
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
                      message: "Please enter your password!",
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
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={9} xl={9} lg={9} md={7} sm={7} xs={2}></Col>
        </Row>
      </Content>
      <Footer />
    </Fragment>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const cardStyle = {
  minWidth: 350,
  height: 350,
  borderRadius: "2px",
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, setLoading, clearErrors })(
  Login
);
