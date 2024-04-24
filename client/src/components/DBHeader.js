import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsToggles2, MdSearch, BsFillBellFill, MdLogout } from "../assets/icons";
import { buttonClick } from "../animation";
import { motion } from "framer-motion";
import {Avatar} from '../assets'
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { setUserNull } from "../containers/context/actions/userActions";

export const DBHeader = () => {
  const user = useSelector((state) => state.user);

  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const dispatch = useDispatch();

const signOut = () =>{
  firebaseAuth.signOut().then(() => {
    dispatch(setUserNull())
    navigate("/login", {replace : true})
  }).catch((err) => console.log(err))
}
  return (
    <div className="w-full flex items-center justify-between gap-3 bg-white p-5 shadow-md">
      <p className="text-2xl text-headingColor">
        Welcome to Carving Food{" "}
        {user?.name && (
          <span className="text-base block text-gray-400">{`Hello ${user?.name}...!`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            type="text"
            placeholder="Search Here..."
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-white bg-opacity-10 backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
            <motion.div {...buttonClick} className="w-10 h-10 rounded-md cursor-pointer bg-white bg-opacity-10 backdrop-blur-md shadow-md flex items-center justify-center">
                <MdLogout onClick={signOut} />
            </motion.div>

        </div>
      </div>


    </div>
  );
};
export default DBHeader;
