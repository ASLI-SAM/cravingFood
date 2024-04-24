import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { buttonClick, slideIn, staggerFadeInOut } from "../animation";
import {
  BiChevronsRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../containers/context/actions/displayCartAction";
import { setCartItems } from "../containers/context/actions/cartAction";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import {
  alertNull,
  alertSuccess,
  alertWarning,
} from "../containers/context/actions/alertActions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);

  useEffect(() => {
    let total = 0;
    if (cart) {
      cart.map((data) => {
        total = total + data.product_price * data.quantity;
        setTotal(total);
      });
    }
  }, [cart]);
  const handleCheckOut = () => {
    console.log("check out session");
    if (userProfile[0].contactno === undefined) {
      dispatch(alertWarning("update your profile before check-out"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 10000);
    } else {
      const data = {
        user: user,
        cart: cart,
        total: total,
        contactno: userProfile[0].contactno,
      };
      axios
        .post(`${baseURL}/api/products/create-checkout-session`, { data })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6  gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[25px] w-full h-[15%] flex  items-center  justify-around px-1 py-4 gap-12">
              <div className="w-full flex items-center justify-evenly gap-2 sm:gap-0">
                <p className=" text-xl sm:text-3xl text-zinc-500 font-semibold mx-3">
                  Total
                </p>
                <p className="text-xl sm:text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>

              <motion.button
                {...buttonClick}
                className="mr-3 bg-orange-400 w-full py-2 sm:w-[60%] sm:px-4 sm:py-3 text-[11pt] sm:text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md sm:rounded-2xl rounded-md"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <h1 className="text-3xl text-primary font-bold">Empty Cart</h1>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col sm:flex sm:flex-row items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-4  gap-1 sm:gap-4"
    >
      <div className="flex gap-4 w-full">
        <img
          src={data?.imageURL}
          className="w-[75px] h-[50px] sm:w-24 sm:min-w-[94px] sm:h-24 object-contain"
          alt=""
        />

        <div className="flex items-center justify-start gap-1 w-full">
          <p className="text-lg text-primary font-semibold">
            {data?.product_name}
            <span className="text-sm block capitalize text-gray-400">
              {data?.product_category}
            </span>
          </p>
          <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
            <HiCurrencyRupee className="text-red-400" /> {itemTotal}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-[10pt] sm:text-xl font-semibold text-primary">
            --
          </p>
        </motion.div>
        <p className="text-[10pt] sm:text-lg text-primary font-semibold">
          {data?.quantity}
        </p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-[10pt] sm:text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
