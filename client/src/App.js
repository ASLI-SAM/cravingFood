import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Main, Login, Dashboard, Profile } from "./containers";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./containers/context/actions/userActions";
import { fadeInOut } from "./animation";
import { motion } from "framer-motion";
import {
  MainLoader,
  Alert,
  CheckoutSuccess,
  UsersOrder,
  Menu,
} from "./components";
import { setCartItems } from "./containers/context/actions/cartAction";
import MenuHome from "./components/Menu/MenuHome";
import { alertNull } from "./containers/context/actions/alertActions";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispattch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                dispattch(setCartItems(items));
              });
            }
            dispattch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
        dispattch(alertNull())
      }, 3000);
    });
  }, []);

  return (
    <div className="w-full  h-auto flex flex-col  ">
      {/* Main loader */}
      {/* {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0  bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )} */}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success/" element={<CheckoutSuccess />} />
        <Route path="/user-orders" element={<UsersOrder />} />
        <Route path="/menu" element={<MenuHome />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
