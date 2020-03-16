import React from "react";
import Navbar from "../layouts/Navbar";

const RegistrationSuccess = () => {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "50px",
        fontFamily: "QuickSand",
        fontSizeAdjust: "1.0"
      }}
    >
      <Navbar />
      <h1>
        <strong>Awesome!</strong>
      </h1>
      <br />
      <h3>You have successfully signed up as a volunteer for VBS!</h3>
      <h3>
        Kindly note that training for volunteers will take place on *Date* at
        LIC.
      </h3>
      <h3>Futher communication will be sent to you in due course.</h3>
      <br />
      <h3>The VBS Planning team is looking foward to working with you.</h3>
      <br />
      <h3>God Bless!</h3>
    </div>
  );
};

export default RegistrationSuccess;
