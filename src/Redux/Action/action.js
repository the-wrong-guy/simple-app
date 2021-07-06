import actionTypes from "./action.types";

export const setSelectedSkillsToStore = (data) => ({
  type: actionTypes.SET_SELECTED_SKILLS_TO_STORE,
  payload: data,
});

export const setDetailsToStore = (data) => ({
  type: actionTypes.SET_DETAILS_TO_STORE,
  payload: data,
});
