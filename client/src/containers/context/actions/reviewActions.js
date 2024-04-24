export const getReviews = () => {
  return {
    type: "GET_REVIEWS",
  };
};

export const setReviews = (data) => {
  return {
    type: "SET_REVIEWS",
    reviews: data,
  };
};
