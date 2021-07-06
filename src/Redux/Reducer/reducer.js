import actionTypes from "../Action/action.types";

const intialState = {
  details: null,
  selectedSkills: null,
};
const Profile = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DETAILS_TO_STORE:
      return { ...state, details: action.payload };
    case actionTypes.SET_SELECTED_SKILLS_TO_STORE:
      return { ...state, selectedSkills: action.payload };
    default:
      return state;
  }
};

export default Profile;
