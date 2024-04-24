const reviewReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_REVIEWS":
      return state;
    case "SET_REVIEWS":
      return action.reviews;
    default:
      return state;
  }
};

export default reviewReducer;
