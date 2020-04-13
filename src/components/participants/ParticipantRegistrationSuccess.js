import React, { Fragment } from "react";
import Navbar from "../layouts/Navbar";
import { Result, Button } from "antd";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const RegistrationSuccess = () => {
  const { width, height } = useWindowSize();

  return (
    <Fragment>
      <Navbar />
      <Confetti width={width} height={height} gravity={0.2} />
      <Result
        status="success"
        title="Awesome! You have successfully registered your ward for VBS 2020 - Concrete &
        Cranes."
        subTitle="We're looking foward to seeing them there as we explore the love of Jesus!"
        extra={[
          <Button type="primary" key="volunteer" href="/volunteers/register">
            Click here to sign up as a volunteer. We'd be happy to have you
          </Button>,
        ]}
      />
    </Fragment>
  );
};

export default RegistrationSuccess;
