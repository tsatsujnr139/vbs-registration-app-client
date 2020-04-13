import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setStep } from "../../actions/formActions";
import FormVolunteerDetails from "./FormVolunteerDetails";
import ConfirmVolunteerDetails from "./ConfirmVolunteerDetails";
import VolunteerRegistrationSuccess from "./VolunteerRegistrationSuccess";
import PropTypes from "prop-types";
import { Spin, Result, Button } from "antd/lib";

import { getGrades } from "../../actions/participantActions";

const RegisterParticipantForm = ({
  formDetails: { step },
  participant: { grades, loading, error },
  getGrades,
  setStep,
}) => {
  useEffect(() => {
    getGrades();
    //eslint-disable-next-line
  }, []);

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Oops! Something went wrong. Please try again later"
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    );
  }

  if (loading || grades === null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "200px" }} />
    );
  }
  switch (step) {
    case 1:
      return <FormVolunteerDetails nextStep={nextStep} grades={grades} />;
    case 2:
      return (
        <ConfirmVolunteerDetails nextStep={nextStep} prevStep={prevStep} />
      );
    case 3:
      return <VolunteerRegistrationSuccess />;
    default:
      break;
  }
};

RegisterParticipantForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  participant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant,
});

export default connect(mapStateToProps, { setStep, getGrades })(
  RegisterParticipantForm
);
