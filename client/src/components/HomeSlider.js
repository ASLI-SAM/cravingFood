import { motion } from "framer-motion";
import React from "react";
import {Slider} from "../components";

const HomeSlider = () => {
  return (
    <motion.div className="w-full flex  justify-start flex-col">
      <div className="w-full">
          <p className="text-2xl text-headingColor font-bold">
            Our Fresh & Healthy Fruits
          </p>
          <div className="w-40 h-1 rounded-md bg-blue-500"></div>
      </div>
      <Slider />
    </motion.div>
  );
};

export default HomeSlider;
