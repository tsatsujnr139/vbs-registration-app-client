import { Button, Card, Col, Form, Input, Layout, Row } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'

import Accent from '../../static/images/accent-1.png'
import Accent2 from '../../static/images/accent-2.png'
import ButtonGroup from 'antd/lib/button/button-group'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import PropTypes from 'prop-types'
import RegistrationProgressBar from './ParticipantRegistrationProgressBar'
import { connect } from 'react-redux'
import { setGuardianDetails } from '../../actions/formActions'

const FormGuardianDetails = ({
  nextStep,
  prevStep,
  formDetails: { guardianDetails, step },
  setGuardianDetails
}) => {
  const { Content } = Layout
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
    //eslint-disable-next-line
  }, [])

  const onFinish = (values) => {
    setGuardianDetails(values)
    nextStep()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Fragment>
      <Navbar />
      <RegistrationProgressBar
        step={step - 1}
        title='Guardian Details'
      />
      <Content>
        <div className='form-wrapper'>
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
                src={Accent}
                alt='...'
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
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Card
                hoverable='true'
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
                    label='Parent/Guardian Full Name'
                    name='parent_name'
                    style={{ display: 'inline-block', width: '100%' }}
                    defaultValue={guardianDetails.fullName}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the parent/guardians full name'
                      }
                    ]}
                  >
                    <Input placeholder='Full Name' />
                  </Form.Item>
                  <Form.Item
                    label='Parent/Guardian Primary Phone Number eg. 024XXXXXXX'
                    name='primary_contact_no'
                    style={{ display: 'inline-block', width: '100%' }}
                    defaultValue={guardianDetails.contact_no}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your primary contact number'
                      }
                    ]}
                  >
                    <Input
                      maxLength='13'
                      placeholder='Phone Number'
                    />
                  </Form.Item>

                  <Form.Item
                    label='Parent/Guardian Alternate Phone Number eg. 024XXXXXXX'
                    name='alternate_contact_no'
                    style={{ display: 'inline-block', width: '100%' }}
                    defaultValue={guardianDetails.alternate_contact_no}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter an alternate contact number '
                      }
                    ]}
                  >
                    <Input
                      maxLength='13'
                      placeholder='Another number we can reach you on'
                    />
                  </Form.Item>

                  <Form.Item
                    label='Parent/Guardian WhatsApp Number eg. 024XXXXXXX'
                    name='whatsApp_no'
                    style={{ display: 'inline-block', width: '100%' }}
                    defaultValue={guardianDetails.whatsApp_no}
                    rules={[
                      {
                        required: false
                      }
                    ]}
                  >
                    <Input
                      maxLength='13'
                      placeholder='Your WhatsApp Number, If any'
                    />
                  </Form.Item>

                  <Form.Item
                    label='Parent/Guardian Email'
                    name='email'
                    style={{ display: 'inline-block', width: '100%' }}
                    defaultValue={guardianDetails.email}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a valid email address '
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address'
                      }
                    ]}
                  >
                    <Input placeholder='Email Address' />
                  </Form.Item>

                  {/* <Form.Item
                    label="Pickup Person's Name"
                    name="pickup_person_name"
                    style={{ display: "inline-block", width: "100%" }}
                    defaultValue={guardianDetails.pickup_person_name}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the pickup person's full name",
                      },
                    ]}
                  >
                    <Input placeholder="Who will be picking the child up?" />
                  </Form.Item>

                  <Form.Item
                    label="Pickup Person's Phone Number eg. 024XXXXXXX"
                    name="pickup_person_contact_no"
                    style={{ display: "inline-block", width: "100%" }}
                    defaultValue={guardianDetails.pickup_person_contact_no}
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter the phone number of the pickup person",
                      },
                    ]}
                  >
                    <Input
                      maxLength="10"
                      placeholder="Pickup Person's Contact Number"
                    />
                  </Form.Item> */}
                  <Form.Item shouldUpdate>
                    {() => (
                      <ButtonGroup>
                        <Button
                          type='default'
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '24px',
                            textAlign: 'center'
                          }}
                        ></span>
                        <Button
                          type='primary'
                          htmlType='submit'
                          disabled={
                            !form.isFieldsTouched(true) ||
                            form
                              .getFieldsError()
                              .filter(({ errors }) => errors.length).length
                          }
                        >
                          Next
                        </Button>
                      </ButtonGroup>
                    )}
                  </Form.Item>
                </Form>
              </Card>
            </Col>
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
                alt='...'
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
  height: 700,
  borderRadius: '2px'
}

FormGuardianDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setGuardianDetails: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  formDetails: state.formDetails
})

export default connect(mapStateToProps, { setGuardianDetails })(
  FormGuardianDetails
)
