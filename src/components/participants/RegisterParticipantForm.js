import React, { useEffect } from "react"
import { connect } from "react-redux"
import { setStep } from "../../actions/formActions"
import FormParticipantDetails from "./FormParticipantDetails"
import FormGuardianDetails from "./FormGuardianDetails"
import ConfirmParticipantDetails from "./ConfirmParticipantDetails"
import RegistrationSuccess from "./ParticipantRegistrationSuccess"
import PropTypes from "prop-types"

const RegisterParticipantForm = ({ formDetails: { step }, setStep }) => {
  useEffect(() => {
    //eslint-disable-next-line
  }, [])

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1)
  }

  // Back to previous step
  const prevStep = () => {
    setStep(step - 1)
  }

  switch (step) {
    case 1:
      return <FormParticipantDetails nextStep={nextStep} />
    case 2:
      return (
        <FormGuardianDetails
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )
    case 3:
      return (
        <ConfirmParticipantDetails
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )
    case 4:
      return <RegistrationSuccess />
    default:
      break
  }
}

RegisterParticipantForm.propTypes = {
  formDetails: PropTypes.object.isRequired,
  participant: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  formDetails: state.formDetails,
  participant: state.participant
})

export default connect(mapStateToProps, { setStep })(RegisterParticipantForm)
