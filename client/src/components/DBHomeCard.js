import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../containers/context/actions/productAction";
import { getAllOrder, getAllProducts, getAllUsers } from "../api";
import { setAllUserDetails } from "../containers/context/actions/allUsersAction";
import {
  SlBasketLoaded,
  FaLongArrowAltUp,
  MdCurrencyRupee,
  HiUserGroup,
  SlNote,
  PiCookingPotBold,
  MdDeliveryDining,
} from "../assets/icons";
import { setOrders } from "../containers/context/actions/ordersAction";

const DBHomeCard = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const getAllUser = useSelector((state) => state.allUsers);
  let todayOrders = 0;
  const [preparing, setPreparing] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const d = new Date()
  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }

    if (!getAllUser) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  useEffect(() => {
    getAllOrder().then((data) => {
      todayOrders = data.filter(item => item.order_id > data.order_id > Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),"00","00","00")).length

      dispatch(setOrders(data));
      setPreparing(
        data.filter((data) => {
          return ( data.sts === "preparing" && data.order_id > Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),"00","00","00"));
        })
      );
      setDelivery(
        data.filter((data) => {
          return data.sts === "delivered" && data.order_id > Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),"00","00","00");
        })
      );

      setRevenue((revenue) => {
        let rev = 0;
        data.filter((item) => {
          if (item.sts === "delivered"  && item.order_id > Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),"00","00","00")) {
            rev = rev + Number(item.total);
          }
        });
        return rev;
      });
    });
  }, []);

  return (
    <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-3 ">
      <div className="min-w-[200px] w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-gray-200 rounded-full p-3">
          <SlBasketLoaded className="text-3xl text-violet-600" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Sales <span className="text-[13pt] text-gray-500">| Today </span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            {delivery?.length}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>

      <div className="min-w-[200px]w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-pink-200 rounded-full p-3">
          <MdCurrencyRupee className="text-3xl text-pink-600" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Revenue <span className="text-[13pt] text-gray-500">| Today </span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            &#8377; {revenue}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>

      <div className="min-w-[200px] w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-green-200 rounded-full p-3">
          <HiUserGroup className="text-3xl text-green-600" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Customers <span className="text-[13pt] text-gray-500">| Today</span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            {getAllUser?.length}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>

      <div className="min-w-[200px] w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-yellow-200 rounded-full p-3">
          <SlNote className="text-3xl text-yellow-600" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Ordered <span className="text-[13pt] text-gray-500">| Today </span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            {todayOrders}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>

      <div className="min-w-[200px] w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-blue-200 rounded-full p-3">
          <PiCookingPotBold className="text-3xl text-blue-600" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Preparing{" "}
            <span className="text-[13pt] text-gray-500">| Today </span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            {preparing?.length}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>

      <div className="min-w-[200px] w-full h-[100px] flex bg-white shadow-md items-center justify-around">
        <div className="bg-red-200 rounded-full p-3">
          <MdDeliveryDining className="text-3xl text-red-600" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-semibold text-xl ">
            Delivery <span className="text-[13pt] text-gray-500">| Today </span>
          </h2>
          <h4 className=" font-bold text-2xl relative">
            {delivery?.length}{" "}
            <span className="text-[12pt] text-green-500">
              12% <FaLongArrowAltUp className="inline absolute top-2.5" />
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DBHomeCard;
