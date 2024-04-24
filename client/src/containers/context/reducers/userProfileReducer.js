const userProfileReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE":
      return state;
    case "SET_USER_PROFILE":
      return action.details;
    default:
      return state;
  }
};

export default userProfileReducer;
