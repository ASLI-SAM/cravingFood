import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoFastFood } from "../assets/icons";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animation";
import { categories } from "../utils/styles";
import SliderCard from "./SliderCard";

const FilterSection = () => {
  const [category, setCategory] = useState("fruits");
  const products = useSelector((state) => state.products);

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className=" w-full flex items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-1 mb-5">
          <p className="text-2xl text-headingColor font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-blue-500"></div>
        </div>
      </div>

      <div className="w-full overflow-x-scroll pt-6 flex items-start justify-center gap-5 py-4 flex-wrap">
        {categories &&
          categories.map((data, i) => (
            <FilterCard
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>

      <div className=" w-full flex items-center justify-center flex-wrap gap-4 ">
        {products &&
          products
            .filter((data) => data.category === category)
            .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      onClick={() => setCategory(data.category)}
      className={`group w-28 min-w-[150px] cursor-pointer rounded-full py-2 ${
        category === data.category ? "bg-blue-500" : "bg-primary"
      } hover:bg-blue-500 shadow-md flex  items-center justify-center flex-wrap gap-4 `}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : "bg-blue-600"
        }`}
      >
        <IoFastFood
          className={`${
            category === data.category ? "text-blue-500" : "text-primary"
          } group-hover:text-blue-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
