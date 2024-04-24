import React from "react";
import { FaStar, IoBasket } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { alertNull, alertSuccess } from "../../containers/context/actions/alertActions";
import { addNewItemToCart, getAllCartItems } from "../../api";
import { setCartItems } from "../../containers/context/actions/cartAction";

const MenuCard = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
    <>
      {data ? (
        <div className="w-[350px] h-[210px] border border-gray-100 bg-white flex rounded-lg p-3 flex-col shadow-lg justify-between">
          <div className="flex justify-between">
            <p className="text-base text-blue-500 font-semibold text-[.8rem]">
              By Craving Food
            </p>
            <div className="flex items-baseline">
              <FaStar className="text-[12pt] mr-1 text-yellow-500" />
              <p className="text-[12pt]">5</p>
            </div>
          </div>

          <div className="flex justify-between pl-2">
            <div className="w-[150px]">
              <h5 className="text-[15pt]">{data.product_name}</h5>
              <p className="text-[11pt] text-gray-600 font-semibold">
                {" "}
                &#8377;{data.price}
              </p>
              <p className="line-clamp-2 text-[12pt]">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </p>
            </div>
            <div className="flex relative">
              <img
                src={data.imageurl}
                alt=""
                className="h-[80px] w-[80px]  object-contain"
              />
              <input
                type="button"
                value="Add"
                className="absolute bg-green-700 text-white rounded-md px-4 py-2 font-bold top-[6rem] right-3 cursor-pointer"
                onClick={sendToCart}
              />
            </div>
          </div>

          <div className="p-2">
            <p className="text-[14pt]">Deivery : 30 min</p>
          </div>
        </div>
      ) : (
        <>
          <h3>No data found</h3>
        </>
      )}
    </>
  );
};

export default MenuCard;
