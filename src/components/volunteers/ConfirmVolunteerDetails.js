import { Button, Card, Col, Descriptions, Modal, Row } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { clearErrors, registerVolunteer } from '../../actions/volunteerActions'

import Accent3 from '../../static/images/accent-3.png'
import Footer from '../layouts/Footer'
import LogoGrayscale from '../../static/images/logo_grayscale.png'
import Navbar from '../layouts/Navbar'
import PropTypes from 'prop-types'
import RegistrationProgressBar from './VolunteerRegistrationProgressBar'
import { connect } from 'react-redux'

const ConfirmVolunteerDetails = ({
  nextStep,
  prevStep,
  formDetails: { volunteerDetails },
  formDetails: {
    volunteerDetails: {
      last_name,
      first_name,
      contact_no,
      whatsApp_no,
      email,
      gender,
      preferred_role,
      preferred_class,
      church,
      previous_volunteer,
      previous_site,
      t_shirt_request,
      t_shirt_size
    },
    step
  },
  volunteer: { error, loading, success },
  registerVolunteer,
  clearErrors
}) => {
  useEffect(() => {
    if (error) {
      errorAlert()
      clearErrors()
    }
    if (success) {
      nextStep()
    }
  })

  const onConfirm = (volunteerDetails) => {
    // register the volunteer
    const values = {
      ...volunteerDetails
    }
    registerVolunteer({ ...values })
  }

  const errorAlert = () => {
    Modal.error({
      title: 'Error Completing Registration',
      content:
        'There was an error completing your registration at this time. Please try again later'
    })
  }

  return (
    <Fragment>
      <Navbar />
      <RegistrationProgressBar
        step={step - 1}
        title='Please Confirm Your Details'
      />
      <div
        className='confirm-details-wrapper'
        style={{ background: '#f3f5f7', padding: '30px' }}
      >
        <Row>
          <Col
            span={6}
            xl={6}
            lg={6}
            md={6}
            sm={0}
            xs={0}
          >
            <img
              src={LogoGrayscale}
              alt=''
            />
          </Col>
          <Col
            span={12}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
          >
            <Card hoverable='true'>
              <Descriptions
                title='Volunteer Details'
                layout='vertical'
                size='default'
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
                labelStyle={{ fontWeight: '800' }}
              >
                <Descriptions.Item
                  label='Surname'
                  span={2}
                >
                  {last_name}
                </Descriptions.Item>
                <Descriptions.Item label='First Name'>
                  {first_name}
                </Descriptions.Item>
                <Descriptions.Item label='Gender'>{gender}</Descriptions.Item>
                <Descriptions.Item label='Phone Number'>
                  {contact_no}
                </Descriptions.Item>
                <Descriptions.Item label='WhatsApp Number'>
                  {whatsApp_no}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>{email}</Descriptions.Item>
                <Descriptions.Item label='Preferred Role'>
                  {preferred_role}
                </Descriptions.Item>
                <Descriptions.Item label='Preferred Class'>
                  {preferred_class}
                </Descriptions.Item>
                <Descriptions.Item
                  label='Church'
                  span={3}
                >
                  {church}
                </Descriptions.Item>
                <Descriptions.Item
                  label='Previous Volunteer'
                  span={1}
                >
                  {previous_volunteer ? 'Yes' : 'No'}
                </Descriptions.Item>
                {previous_volunteer && (
                  <Descriptions.Item
                    label='Previous Volunteer Site'
                    span={1}
                  >
                    {previous_site}
                  </Descriptions.Item>
                )}
                {t_shirt_request && (
                  <Descriptions.Item
                    label='T-Shirt Size'
                    span={1}
                  >
                    {t_shirt_size}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
          <Col
            span={6}
            xl={6}
            lg={6}
            md={6}
            sm={0}
            xs={0}
          >
            <img
              src={Accent3}
              alt=''
            />
          </Col>
        </Row>
        <span
          style={{
            display: 'inline-block',
            width: '24px',
            textAlign: 'center'
          }}
        ></span>
        <div className='confirm-buttons-wrapper'>
          <Button
            size='large'
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
            size='large'
            loading={loading}
            onClick={() => onConfirm(volunteerDetails)}
          >
            Confirm
          </Button>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

ConfirmVolunteerDetails.propTypes = {
  formDetails: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  registerVolunteer: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  volunteer: state.volunteer
})

export default connect(mapStateToProps, { registerVolunteer, clearErrors })(
  ConfirmVolunteerDetails
)
