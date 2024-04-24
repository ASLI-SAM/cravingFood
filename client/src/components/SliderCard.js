import React from "react";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animation";
import {
  alertNull,
  alertSuccess,
} from "../containers/context/actions/alertActions";
import { setCartItems } from "../containers/context/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { addNewItemToCart, getAllCartItems, getUserProfile } from "../api";
import { setUserProfile } from "../containers/context/actions/userProfileActions";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const sendToCart = () => {
    dispatch(alertSuccess("Added to the cart"));
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });

      setInterval(() => {
        dispatch(alertNull());
      }, 4000);
    });
  };

  return (
    // <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-4 w-full md:w-340 md:min-w-300 gap-3 shadow  bg-gradient-to-r from-indigo-500 to-blue-500">
    //   <img src={data.imageURL} className="w-[125px] h-[125px] object-contain" alt="" />
    //   <div className="relative pt-12">
    //     <p className="text-xl text-primary font-semibold">
    //       {data.product_name}
    //     </p>
    //     <p className="text-lg font-semibold text-white flex items-center justify-center gap-1">
    //       <HiCurrencyRupee className="text-white" />{" "}
    //       {parseFloat(data.product_price).toFixed(2)}
    //     </p>

    //     <motion.div
    //       {...buttonClick}
    //       onClick={sendToCart}
    //       className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
    //     >
    //       <IoBasket className="text-2xl text-primary" />
    //     </motion.div>
    //   </div>

    // </div>
    <div class="mx-auto md:w-[250px] transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center">
      <img
        class="h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-contain mt-6"
        src={data.imageurl}
        alt="Product Image"
      />
      <div class="p-4">
        <h2 class="mb-2 text-lg font-medium  text-gray-900">
          {data.product_name}
        </h2>
        <p class="hidden md:block md:mb-2 text-base  text-gray-700">
          {data.product_name} is excellent
        </p>
        <div class="flex items-center">
          <HiCurrencyRupee className="text-black" />
          {"  "}
          <p class="mr-2 text-lg font-semibold text-gray-900  ">
            {parseFloat(data.price).toFixed(2)}
          </p>

          <p class="text-base  font-medium text-gray-500 line-through ">
            {data.offer > 0
              ? parseFloat((data.price * 100) / data.offer).toFixed(2)
              : ""}
          </p>
          <p class="ml-2 text-base font-medium text-green-500">
            {data.offer > 0 ? data.offer + "% off" : ""}
          </p>
        </div>
      </div>
      <motion.div
        {...buttonClick}
        onClick={sendToCart}
        className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute bottom-20 right-3 cursor-pointer"
      >
        <IoBasket className="text-2xl text-primary" />
      </motion.div>

      {data.offer > 0 && (
        <p className="bg-emerald-700 p-2  text-primary text-[10pt] sm:text-[13pt] font-semibold absolute top-0 rounded-md right-0">
          {data.offer}% offer
        </p>
      )}
    </div>
  );
};

export default SliderCard;
