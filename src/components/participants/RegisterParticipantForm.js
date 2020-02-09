import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setStep } from "../../actions/formActions";
import FormParticipantDetails from "./FormParticipantDetails";
import FormGuardianDetails from "./FormGuardianDetails";
import ConfirmParticipantDetails from "./ConfirmParticipantDetails";
import RegistrationSuccess from "./ParticipantRegistrationSuccess";
import PropTypes from "prop-types";

import { getGrades } from "../../actions/participantActions";
import { Spin } from "antd";

const RegisterParticipantForm = ({
  formDetails: { step },
  setStep,
  participant: { grades, loading },
  getGrades
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

  if (loading || grades === null) {
    return (
      <Spin size="large" style={{ display: "block", marginTop: "100px" }} />
    );
  }

  switch (step) {
    case 1:
      return <FormParticipantDetails nextStep={nextStep} grades={grades} />;
    case 2:
      return <FormGuardianDetails nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return (
        <ConfirmParticipantDetails nextStep={nextStep} prevStep={prevStep} />
      );
    case 4:
      return <RegistrationSuccess />;
    default:
      break;
  }
};

RegisterParticipantForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails,
  participant: state.participant
});

export default connect(mapStateToProps, { setStep, getGrades })(
  RegisterParticipantForm
);
