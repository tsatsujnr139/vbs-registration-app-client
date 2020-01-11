import React from "react";
import { connect } from "react-redux";
import setStep from "../../reducers/formReducer";
import FormParticipantDetails from "./FormParticipantDetails";
import FormGuardianDetails from "./FormGuardianDetails";
import PropTypes from "prop-types";

const RegisterParticipantForm = ({
  formDetails: { step, participantDetails, guardianDetails },
  setStep
}) => {
  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <FormParticipantDetails
          nextStep={nextStep}
          participantDetails={participantDetails}
        />
      );
    case 2:
      return (
        <FormGuardianDetails
          nextStep={nextStep}
          prevStep={prevStep}
          guardianDetails={guardianDetails}
        />
      );

    default:
      break;
  }
};

RegisterParticipantForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

export default connect(mapStateToProps, { setStep })(RegisterParticipantForm);
