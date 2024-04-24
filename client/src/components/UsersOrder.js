import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { Header, OrderData } from ".";
import { setOrders } from "../containers/context/actions/ordersAction";

const UsersOrder = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  console.log(user?.user_id)
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) =>
         item.userid === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userid === user?.user_id));
    }
  }, [orders]);

  console.log(userOrders)

  return (
    <main className="w-screen min-h-screen  bg-primary px-3">
      <Header />
      <h1 className="text-3xl font-semibold mt-28 ml-5">You orders</h1>
      <div className="grid  grid-cols-3 gap-5 px-3 mt-2">

        {userOrders?.length > 0 ? (
          <>
            {userOrders.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
