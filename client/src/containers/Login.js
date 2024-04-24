import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";
import { useDispatch, useSelector, getState } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { FaCodeBranch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { alertInfo, alertWarning } from "./context/actions/alertActions";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [userEmail, seTuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  // connect with google function
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      dispatch(alertInfo("Required fields should not be empty"));
    } else {
      if (password === confirmPassword) {
        seTuserEmail("");
        setpassword("");
        setconfirmPassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password is not matched"));
      }
    }
  };

  // action

  // reducer

  // store -< globalized

  // dispattch

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password is incorrect"));
    }
  };

  return (
    <div className="w-full pb-[25rem] relative flex ">
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute"
        alt=""
      />

      {/* login form container */}
      <div
        className="flex flex-col items-center bg-white bg-opacity-10
        w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6"
      >
        {/* Top -logo section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-white font-semibold text-2xl ">Carving Food</p>
        </div>

        {/* Welcome test */}
        <p className="text-3xl font-semibold text-white">Welcome Back </p>
        <p className="text-xl text-white -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"} following
        </p>

        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-9xl, text-white" />}
            inputState={userEmail}
            inputSetState={seTuserEmail}
            type={"email"}
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder={"Password"}
            icon={<FaLock className="text-9xl, text-white" />}
            inputState={password}
            inputSetState={setpassword}
            type={"password"}
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password"}
              icon={<FaLock className="text-9xl, text-white" />}
              inputState={confirmPassword}
              inputSetState={setconfirmPassword}
              type={"password"}
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p className="text-white">
              Doesn't have account:{" "}
              <motion.button
                className="text-red-400 underline cursor-pointer bg-transparent"
                {...buttonClick}
                onClick={() => setisSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p className="text-white">
              Already have an account:{" "}
              <motion.button
                className="text-red-400 underline cursor-pointer bg-transparent"
                {...buttonClick}
                onClick={() => setisSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* Sign in up button */}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-black text-xl capitalize hover:bg-red-500 transition-all duration-200"
              onClick={signUpWithEmailPass}
            >
              Sign up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-black text-xl capitalize hover:bg-red-500 transition-all duration-200"
              onClick={signInWithEmailPass}
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2  bg-white bg-opacity-10 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-white">Connect with google</p>
        </motion.div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2  bg-white bg-opacity-10 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var token = jwtDecode(credentialResponse.credential);
              dispatch(setUserDetails(token));
              console.log(token);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
