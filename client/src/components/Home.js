import { motion } from "framer-motion";
import React from "react";
import { Delivery, HeroBg } from "../assets";
import { buttonClick, staggerFadeInOut } from "../animation";
import { randomData } from "../utils/styles";

const Home = () => {
  return (
    <motion.div className="w-full grid  grid-cols-1 sm:grid-cols-2">
      <div className="flex flex-col items-start justify-start gap-6">
       

        <p className="text-[40px] text-headingColor md:text-[45px] font-sans font-extrabold tracking-wider">
          Different Spices For The Different Tastes
        
        </p>

        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsam
          doloribus et similique distinctio, rem deleniti ipsa, nesciunt vitae
          labore voluptates sunt ducimus mollitia id libero! Nostrum expedita
          libero recusandae?
        </p>
        <motion.button
          {...buttonClick}
          className="bg-emerald-600 px-4 py-2 rounded-md text-primary text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>

      <div className="flex flex-col items-center justify-evenly gap-5 sm:gap-5">
        <div>
          <h1 className="text-3xl font-bold my-6 sm:my-0">Top sales for you</h1>
        </div>
        <div className="w-full grid grid-cols-2 gap-3  sm:flex sm:flex-wrap justify-center ">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className=" w-190 h-50 sm:h-39 md:h-auto  md:w-190 p-4 bg-white  rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-[100px] h-[100px] sm:w-32 sm:h-32  object-contain "
                  alt=""
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center  md:text-base text-gray-500 font-semibold  capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm  font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>{" "}
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
