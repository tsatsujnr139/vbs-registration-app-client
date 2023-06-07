import { Button, Result } from 'antd'
import React, { Fragment } from 'react'

import Confetti from 'react-confetti'
import Navbar from '../layouts/Navbar'
import useWindowSize from 'react-use/lib/useWindowSize'

const RegistrationSuccess = () => {
  const { width, height } = useWindowSize()

  return (
    <Fragment>
      <Navbar />
      <Confetti
        width={width}
        height={height}
        gravity={0.025}
        numberOfPieces={50}
      />
      <Result
        status='success'
        title={`Awesome! You have successfully registered your ward for VBS ${new Date().getFullYear()}`}
        subTitle="We're looking foward to seeing them there as we explore how following Jesus Changes the Game"
        extra={[
          <div>
            <Button
              type='primary'
              key='volunteer'
              href='/volunteers/register'
            >
              Click here to sign up as a volunteer. We'd be happy to have you
            </Button>
            <br />
            <span
              style={{
                display: 'inline-block',
                padding: '20px 0px 20px 0px'
              }}
            >
              OR
            </span>
            <br />
            <Button
              type='primary'
              key='volunteer'
              href='/participants/register'
            >
              Register another participant
            </Button>
          </div>
        ]}
      />
    </Fragment>
  )
}

export default RegistrationSuccess
