const allUserReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_USER":
      return state;
    case "SET_ALL_USER":
      return action.allUser;
    default:
      return state;
  }
};

export default allUserReducer;
