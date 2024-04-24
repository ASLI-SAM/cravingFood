import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUsersReducer";
import cartReducer from "./cartReducer";
import displayCartReducer from "./displayCartReducer";
import orderReducer from "./orderReducer";
import reviewReducers from "./reviewReducers";
import userProfileReducer from "./userProfileReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUserReducer,
  cart: cartReducer,
  isCart: displayCartReducer,
  orders: orderReducer,
  reviews: reviewReducers,
  userProfile: userProfileReducer,
});

export default myReducers;
