export const setUserProfile = (data) => {
  return {
    type: "SET_USER_PROFILE",
    details: data,
  };
};

export const gerUserProfile = (data) => {
  return {
    type: "GET_USER_PROFILE",
  };
};

