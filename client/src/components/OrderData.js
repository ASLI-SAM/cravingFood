import { motion, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaWindowClose,
  FaWindowMinimize,
  HiCurrencyRupee,
  MdReviews,
} from "../assets/icons";
import { buttonClick, slideTop, staggerFadeInOut } from "../animation";
import { addReviwes, getAllOrder, updateOrderSts } from "../api";
import { setOrders } from "../containers/context/actions/ordersAction";
import { useDispatch, useSelector } from "react-redux";
import { watermelon } from "../assets";
import { PiCookingPotBold, MdDeliveryDining } from "../assets/icons";

const OrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClick = (orderId, sts) => {
    updateOrderSts(orderId, sts).then((response) => {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setStatus(sts);
        setIsMenu(false);
      });
    });
  };

  const [isMenu, setIsMenu] = useState(false);
  const [status, setStatus] = useState(data?.sts);
  const [review, setReview] = useState("");
  const [reviewStar, setReviewStar] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const reviewData = {
    data,
    review,
    reviewStar,
  };

  const handleStatus = (e) => {
    setStatus();
    setIsMenu(false);
  };


  const handleReview = () => {
    addReviwes(user?.user_id, reviewData);
    setReview("");
    setIsReview(false);
  };
  const totalStars = [];
  for (let i = 0; i < reviewStar; i++) {
    if(i > 4){
      setReviewStar(5)
      break;}
    totalStars.push(<FaStar />);
    
  }

  return (
    <>
      {/* <motion.div {...staggerFadeInOut(index)} className=" gap-4 w-full">
        <div className="flex  justify-evenly bg-white shadow-md rounded-md p-2 relative overflow-hidden">
          <div className="flex gap-4 flex-col items-center justify-center w-full">
            {data?.items &&
              data.items.map((item) => (
                <>
                
                  <div
                    className={`flex  justify-evenly bg-white shadow-md rounded-md p-2 w-full absolute top-0 ${
                      isReview ? "left-[0%]" : "left-[100%]"
                    } h-full z-20 transition-all ease-in-out duration-500`}
                  >
                    <motion.div
                      {...buttonClick}
                      className=" font-semibold absolute top-1 rounded-full left-2  text-red-600 flex items-center text-[13pt] p-1"
                    >
                      <FaWindowClose
                        className="text-[17pt] cursor-pointer"
                        onClick={() => setIsReview(!isReview)}
                      />
                    </motion.div>

                    <div className="flex justify-center items-center gap-2 w-full ">
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center w-[200px]">
                          <img
                            src={item.imageURL}
                            alt=""
                            className="w-[100px] h-[100px] "
                          />
                          <p className="text-xl font-semibold">
                            {item?.product_name}
                          </p>
                        </div>
                        <div className="flex text-yellow-500 mt-2">
                          {totalStars}
                        </div>
                      </div>

                      <div className="w-full flex flex-col justify-evenly">
                        <label htmlFor="Review" className="text-gray-600">
                          Write your comments
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Review the food"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          className="border border-gray-400 rounded-md p-2 outline-pink-900"
                          name="Review"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <label htmlFor="rate" className="text-gray-600">
                              Give your Rating
                            </label>
                            <input
                              type="number"
                              max={5}
                              min={1}
                              className="border border-gray-400 rounded-md p-2 outline-pink-900"
                              name="rate"
                              value={reviewStar}
                              onChange={(e) => setReviewStar(e.target.value)}
                            />
                          </div>
                          <p
                            className=" bg-pink-800 text-primary font-semibold rounded-md py-2 px-3 cursor-pointer self-end"
                            onClick={handleReview}
                          >
                            Submit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
           

                  <img
                    src={item.imageURL}
                    alt=""
                    className="h-[100px] w-[100px] object-contain"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold">
                      {item?.product_name}{" "}
                    </h3>
                    <p className="">Qty: {item?.quantity}</p>
                    <p>Price : {data?.total} </p>
                  </div>
                </>
              ))}
          </div>

          <div className="flex flex-col mb-2 justify-end w-full gap-2">
            {!admin && data.sts === "delivered" && (
              <motion.div
                {...buttonClick}
                className=" font-semibold absolute top-1 rounded-full left-2  text-green-600 flex items-center text-[13pt] p-1"
              >
                <MdReviews
                  className="text-[21pt] cursor-pointer"
                  onClick={() => setIsReview(!isReview)}
                />
              </motion.div>
            )}

            {(status === "preparing" && (
              <div className="bg-orange-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-orange-600 flex items-center gap-3 py-1 text-[13pt]">
                <PiCookingPotBold className="text-[15pt]" />
                <p className="">Preparing</p>
              </div>
            )) ||
              (status === "delivered" && (
                <div className="bg-green-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-green-600 flex items-center gap-3 py-1 text-[13pt]">
                  <MdDeliveryDining className="text-[20pt]" />
                  <p className="">Delivered</p>
                </div>
              )) ||
              (status === "cancelled" && (
                <div className="bg-red-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-red-600 flex items-center gap-3 py-1 text-[13pt]">
                  <MdDeliveryDining className="text-[20pt]" />
                  <p className="">Cancelled</p>
                </div>
              ))}

            <div className="flex items-start flex-col">
              <h1 className=" font-semibold  text-[14pt] ">Shipping Address</h1>
              <p className="text-gray-600 text-[13pt]  ">
                {" "}
                {data.shipping_details.name}, {data.customer.phone}
              </p>

             
              <p className="text-gray-600 text-[13pt] ">
                {data.shipping_details.address.line1},<br></br>
                {data.shipping_details.address.country}
                {data.shipping_details.address.state} -
                {data.shipping_details.address.postal_code}
              </p>
            </div>

            {isMenu && (
              <motion.div
                className="w-48 px-6 py-4 bg-gray-100 bg-opacity-100 backdrop-blur-md rounded-md shadow-md absolute top-18 right-0 flex flex-col gap-4"
                {...slideTop}
              >
                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.orderId, "preparing")}
                >
                  Preparing
                </p>

                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.orderId, "delivered")}
                >
                  Delivered
                </p>

                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.orderId, "cancelled")}
                >
                  Cancelled
                </p>
              </motion.div>
            )}

            {admin && (
              <input
                type="button"
                value={status}
                className={` px-3 py-1 rounded-md text-[14pt] font-semibold cursor-pointer self-start ${
                  (status === "delivered" && "bg-green-500 text-primary ") ||
                  (status === "preparing" && "bg-orange-400 text-primary") ||
                  (status === "cancelled" && "bg-red-500 text-primary")
                }`}
                onClick={() => setIsMenu(true)}
              />
            )}
          </div>
        </div>
      </motion.div> */}

      <motion.div {...staggerFadeInOut(index)} className=" gap-4 w-full">
        <div className="flex  justify-evenly bg-white shadow-md rounded-md p-2 relative overflow-hidden">
          <div className="flex gap-4 flex-col items-center justify-center w-full">
            <div
              className={`flex  justify-evenly bg-white shadow-md rounded-md p-2 w-full absolute top-0 ${
                isReview ? "left-[0%]" : "left-[100%]"
              } h-full z-20 transition-all ease-in-out duration-500`}
            >
              <motion.div
                {...buttonClick}
                className=" font-semibold absolute top-1 rounded-full left-2  text-red-600 flex items-center text-[13pt] p-1"
              >
                <FaWindowClose
                  className="text-[17pt] cursor-pointer"
                  onClick={() => setIsReview(!isReview)}
                />
              </motion.div>

              <div className="flex justify-center items-center gap-2 w-full ">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center w-[200px]">
                    <img
                      src={data.imageurl}
                      alt=""
                      className="w-[100px] h-[100px] "
                    />
                    <p className="text-xl font-semibold">
                      {data?.product_name}
                    </p>
                  </div>
                  <div className="flex text-yellow-500 mt-2 overflow-hidden">{totalStars}</div>
                </div>

                <div className="w-full flex flex-col justify-evenly">
                  <label htmlFor="Review" className="text-gray-600">
                    Write your comments
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Review the food"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="border border-gray-400 rounded-md p-2 outline-pink-900"
                    name="Review"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <label htmlFor="rate" className="text-gray-600">
                        Give your Rating
                      </label>
                      <input
                        type="number"
                        max={5}
                        min={1}
                        className="border border-gray-400 rounded-md p-2 outline-pink-900"
                        name="rate"
                        value={reviewStar}
                        onChange={(e) => setReviewStar(e.target.value)}
                      />
                    </div>
                    <p
                      className=" bg-pink-800 text-primary font-semibold rounded-md py-2 px-3 cursor-pointer self-end"
                      onClick={handleReview}
                    >
                      Submit
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <img
              src={data.imageurl}
              alt=""
              className="h-[100px] w-[100px] object-contain"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-semibold">{data?.product_name} </h3>
              <p className="">Qty: {data?.quantity}</p>
              <p>Price : {data?.total} </p>
            </div>
          </div>

          <div className="flex flex-col mb-2 justify-end w-full gap-2">
            {!admin && data.sts === "delivered" && (
              <motion.div
                {...buttonClick}
                className=" font-semibold absolute top-1 rounded-full left-2  text-green-600 flex items-center text-[13pt] p-1"
              >
                <MdReviews
                  className="text-[21pt] cursor-pointer"
                  onClick={() => setIsReview(!isReview)}
                />
              </motion.div>
            )}

            {(status === "preparing" && (
              <div className="bg-orange-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-orange-600 flex items-center gap-3 py-1 text-[13pt]">
                <PiCookingPotBold className="text-[15pt]" />
                <p className="">Preparing</p>
              </div>
            )) ||
              (status === "delivered" && (
                <div className="bg-green-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-green-600 flex items-center gap-3 py-1 text-[13pt]">
                  <MdDeliveryDining className="text-[20pt]" />
                  <p className="">Delivered</p>
                </div>
              )) ||
              (status === "cancelled" && (
                <div className="bg-red-200 px-3 font-semibold absolute top-0 rounded-md right-0  text-red-600 flex items-center gap-3 py-1 text-[13pt]">
                  <MdDeliveryDining className="text-[20pt]" />
                  <p className="">Cancelled</p>
                </div>
              ))}

            <div className="flex items-start flex-col">
              <h1 className=" font-semibold  text-[14pt] ">Shipping Address</h1>
              <p className="text-gray-600 text-[13pt]  ">
                {" "}
                {data.name},{/* {data.customer.phone} */}
              </p>

              <p className="text-gray-600 text-[13pt] ">
                {data.line1},<br></br>
                {data.country}
                {data.state} -{data.postal_code}
              </p>
            </div>

            {isMenu && (
              <motion.div
                className="w-48 px-6 py-4 bg-gray-100 bg-opacity-100 backdrop-blur-md rounded-md shadow-md absolute top-18 right-0 flex flex-col gap-4"
                {...slideTop}
              >
                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.order_id, "preparing")}
                >
                  Preparing
                </p>

                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.order_id, "delivered")}
                >
                  Delivered
                </p>

                <p
                  className="hover:text-red-500 text-xl text-textColor cursor-pointer"
                  onClick={() => handleClick(data.order_id, "cancelled")}
                >
                  Cancelled
                </p>
              </motion.div>
            )}

            {admin && (
              <input
                type="button"
                value={status}
                className={` px-3 py-1 rounded-md text-[14pt] font-semibold cursor-pointer self-start ${
                  (status === "delivered" && "bg-green-500 text-primary ") ||
                  (status === "preparing" && "bg-orange-400 text-primary") ||
                  (status === "cancelled" && "bg-red-500 text-primary")
                }`}
                onClick={() => setIsMenu(true)}
              />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OrderData;
