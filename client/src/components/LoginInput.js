import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animation";

export const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputSetState,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-white bg-opacity-10 backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-yellow-50" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={inputState}
        onChange={(e) => inputSetState(e.target.value)}
        className="w-full h-full bg-transparent text-white text-lg font-semibold border-none outline-none"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
