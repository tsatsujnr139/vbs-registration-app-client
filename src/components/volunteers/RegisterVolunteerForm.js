import React from "react";
import { connect } from "react-redux";
import { setStep } from "../../actions/formActions";
import FormVolunteerDetails from "./FormVolunteerDetails";
import ConfirmVolunteerDetails from "./ConfirmVolunteerDetails";
import VolunteerRegistrationSuccess from "./VolunteerRegistrationSuccess";
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
      return <FormVolunteerDetails nextStep={nextStep} />;
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
  setStep: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formDetails: state.formDetails
});

export default connect(mapStateToProps, { setStep })(RegisterParticipantForm);
