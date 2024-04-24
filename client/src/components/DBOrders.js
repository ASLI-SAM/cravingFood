import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../containers/context/actions/ordersAction";
import { DBOrderDataTable, OrderData } from "../components";

const DBOrders = () => {
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);
  
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3   gap-4">
      {orders ? (
        <>
          {orders.map((item, i) => (
            
            <OrderData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>

    // <DBOrderDataTable />
  );
};

export default DBOrders;
