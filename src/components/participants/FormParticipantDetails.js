import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Radio,
  Result,
  Row,
  Select,
  Spin
} from "antd"
import React, { Fragment, useEffect, useState } from "react"

import Accent from "../../static/images/accent-1.png"
import Accent2 from "../../static/images/accent-2.png"
import Footer from "../layouts/Footer"
import Navbar from "../layouts/Navbar"
import PropTypes from "prop-types"
import RegistrationProgressBar from "./ParticipantRegistrationProgressBar"
import { connect } from "react-redux"
import { getGrades } from "../../actions/participantActions"
import moment from "moment"
import { setParticipantDetails } from "../../actions/formActions"
import { participantTShirtSizes } from "../../utils/constants"

const FormParticipantDetails = ({
  nextStep,
  formDetails: { participantDetails, step },
  participant: { loading, grades, error },
  setParticipantDetails,
  getGrades
}) => {
  const { Option } = Select
  const { TextArea } = Input
  const { Content } = Layout

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    getGrades()
    forceUpdate({})
    //eslint-disable-next-line
  }, [])

  const calculateCurrentAge = (date) => {
    const now = moment()
    return now.diff(date, "years")
  }

  const isEligibleAge = (rule, value) => {
    if (Math.sign(value) === -1 || (value && Math.sign(value) === 0)) {
      return Promise.reject("Please select a birth date in the past")
    }
    if (value < 3) {
      return Promise.reject(
        "Only Children older that 3 years are eligible for registration"
      )
    }
    return Promise.resolve()
  }

  const onDateOfBirthChange = (date) => {
    const age = calculateCurrentAge(date)
    form.setFieldsValue({
      age: age
    })
    form.validateFields(["age"])
  }

  const onTShirtRequestChange = (e) => {
    const values = {
      t_shirt_request: e.target.value
    }
    setParticipantDetails(values)
  }

  const onFinish = (fieldsValue) => {
    console.log("Success:", fieldsValue)
    const dob = fieldsValue["date_of_birth"]
    const values = {
      ...fieldsValue,
      grade: "JHS 3",
      session: "Session 1",
      date_of_birth: dob.format("YYYY-MM-DD")
    }
    console.log(values)
    setParticipantDetails(values)
    nextStep()
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Something went wrong. We're trying to figure it out. Please try again later"
        extra={
          <Button
            type="primary"
            href="/"
          >
            Back Home
          </Button>
        }
      />
    )
  }

  if (loading || grades == null) {
    return (
      <Spin
        size="large"
        style={{ display: "block", marginTop: "200px" }}
      />
    )
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
            <Col
              span={7}
              xl={7}
              lg={7}
              md={7}
              sm={0}
              xs={0}
            >
              <img
                src={Accent2}
                alt="accent 2"
              />
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
              <Card
                hoverable="true"
                style={cardStyle}
              >
                <Form
                  initialValues={{
                    remember: true
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
                    name="first_name"
                    defaultValue={participantDetails.first_name}
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
                    label="Other Names"
                    name="other_names"
                    defaultValue={participantDetails.other_names}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
                  >
                    <Input placeholder="Other Names" />
                  </Form.Item>
                  <span
                    style={{
                      display: "inline-block",
                      width: "24px",
                      textAlign: "center"
                    }}
                  ></span>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 12px)"
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a gender "
                      }
                    ]}
                  >
                    <Radio.Group
                      size="medium"
                      buttonStyle="solid"
                    >
                      <Radio.Button value="Male">Male</Radio.Button>
                      <Radio.Button value="Female">Female</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Date of Birth"
                    name="date_of_birth"
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
                    <Input
                      disabled={true}
                      placeholder="Age"
                    />
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
                        message: "Please enter the child's home church"
                      }
                    ]}
                  >
                    <Input placeholder="The church the child attends" />
                  </Form.Item>
                  <br />
                  <Form.Item
                    label="School"
                    name="school"
                    style={{ display: "inline-block", width: "calc(100%)" }}
                    defaultValue={participantDetails.school}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the child's school"
                      }
                    ]}
                  >
                    <Input placeholder="The school the child attends" />
                  </Form.Item>
                  <br />
                  <Form.Item
                    label="Medical Information (Allergies etc.)"
                    name="medical_info"
                    style={{ display: "inline-block", width: "calc(100%)" }}
                    rules={[
                      {
                        required: false
                      }
                    ]}
                  >
                    <TextArea
                      placeholder="Any relevant medical information"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </Form.Item>

                  {/* VBS T-Shirt Request */}
                  {/* <Form.Item
                    label='Would You like to purchase a VBS T-Shirt for your ward?'
                    name='t_shirt_request'
                    style={{ display: 'inline-block', width: 'calc(100%)' }}
                    rules={[
                      {
                        required: false,
                        message: 'Please select an option'
                      }
                    ]}
                  >
                    <Radio.Group
                      size='medium'
                      onChange={onTShirtRequestChange}
                      buttonStyle='solid'
                    >
                      <Radio.Button value='true'>Yes</Radio.Button>
                      <Radio.Button value='false'>No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  {participantDetails.t_shirt_request === 'true' && (
                    <Form.Item
                      label='Select a T-shirt size'
                      name='t_shirt_size'
                      defaultValue={participantDetails.t_shirt_size}
                      style={{
                        display: 'inline-block',
                        width: 'calc(100%)'
                      }}
                      rules={[
                        {
                          required: true,
                          message: 'Please select a t-shirt size'
                        }
                      ]}
                    >
                      <Select defaultValue=''>
                        {participantTShirtSizes.map((size) => (
                          <Option
                            key={size.name}
                            value={size.value}
                          >
                            {size.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )} */}
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
              <img
                src={Accent}
                alt="accent-1"
              />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />
    </Fragment>
  )
}

const cardStyle = {
  minWidth: 400,
  maxWidth: 650,
  minHeight: 800,
  maxHeight: 1200,
  borderRadius: "2px"
}

FormParticipantDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setParticipantDetails: PropTypes.func.isRequired,
  getGrades: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant
})

export default connect(mapStateToProps, { setParticipantDetails, getGrades })(
  FormParticipantDetails
)
