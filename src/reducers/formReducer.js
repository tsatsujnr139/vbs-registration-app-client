import {
  SET_GUARDIAN_DETAILS,
  SET_LOADING,
  SET_PARTICIPANT_DETAILS,
  SET_STEP,
  SET_VOLUNTEER_DETAILS
} from '../actions/types'

const initialState = {
  loading: false,
  step: 1,
  error: null,
  participantDetails: {
    last_name: '',
    first_name: '',
    other_names: '',
    date_of_birth: '',
    age: '',
    grade: '',
    session: null,
    attendance_type: null,
    gender: '',
    church: '',
    school: '',
    medical_info: '',
    t_shirt_request: '',
    t_shirt_size: ''
  },
  guardianDetails: {
    parent_name: '',
    primary_contact_no: '',
    alternate_contact_no: '',
    whatsApp_no: '',
    email: '',
    pickup_person_name: '',
    pickup_person_contact_no: ''
  },
  volunteerDetails: {
    last_name: '',
    first_name: '',
    contact_no: '',
    whatsApp_no: '',
    email: '',
    gender: '',
    preferred_role: '',
    preferred_class: '',
    church: '',
    previous_volunteer: '',
    previous_site: '',
    t_shirt_request: '',
    t_shirt_size: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_STEP:
      return {
        ...state,
        step: action.payload
      }
    case SET_PARTICIPANT_DETAILS:
      return {
        ...state,
        participantDetails: { ...state.participantDetails, ...action.payload }
      }
    case SET_GUARDIAN_DETAILS:
      return {
        ...state,
        guardianDetails: action.payload
      }
    case SET_VOLUNTEER_DETAILS:
      return {
        ...state,
        volunteerDetails: { ...state.volunteerDetails, ...action.payload }
      }
    default:
      return state
  }
}
