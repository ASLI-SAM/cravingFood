import React, { useDebugValue, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../containers/context/actions/ordersAction";
import DBReviews from "./DBReviews";

const DBHomeReport = () => {
  const [delivery, setDelivery] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const orders = useSelector((state) => state.orders);
  const users = useSelector((state) => state.allUsers);

  const date = new Date();

  const yesterday = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate() - 1}`;

  const twoDayBefore = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate() - 2}`;

  const today = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate()}`;

  const yesterdayOrders = orders?.filter(
    (item) => item.date.split("T")[0] === yesterday
  );
  const twoDayBeforeOrders = orders?.filter(
    (item) => item.date.split("T")[0] === twoDayBefore
  );
  const todayOrders = orders?.filter(
    (item) => item.date.split("T")[0] === today
  );

  const dispatch = useDispatch();
  useEffect(() => {
    getAllOrder().then((data) => {
      dispatch(setOrders(data));
      setDelivery(
        data.filter((data) => {
          return data.sts === "delivered";
        })
      );

      setRevenue((revenue) => {
        let rev = 0;
        data.filter((item) => {
          if (item.sts === "delivered") {
            rev = rev + Number(item.total);
          }
        });
        return rev;
      });
    });
  }, []);

  const delieverd = orders?.filter((item) => item.sts === "delivered");

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });
  const short = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate());
  const yesterdayDate = new Date().setDate(todayDate.getDate() - 1);
  const twoDayBeforeDate = new Date().setDate(todayDate.getDate() - 2);

  const todayUsers = users?.filter(
    (user) =>
      f.format(new Date(user.metadata.creationTime)) == f.format(todayDate)
  );
  const yesterdayUsers = users?.filter(
    (user) =>
      f.format(new Date(user.metadata.creationTime)) == f.format(yesterdayDate)
  );
  const twoDayBeforeUsers = users?.filter(
    (user) =>
      f.format(new Date(user.metadata.creationTime)) ==
      f.format(twoDayBeforeDate)
  );

  console.log(todayUsers)
  console.log(yesterdayUsers)
  console.log(twoDayBeforeUsers)
  const [data, setData] = useState({
    series: [
      {
        name: "Sales",
        data: [
          twoDayBeforeOrders !== undefined ? twoDayBeforeOrders.length : 0,
          yesterdayOrders !== undefined ? yesterdayOrders.length : 0,
          todayOrders !== undefined ? todayOrders.length : 0,
        ],
      },
      // {
      //   name: "Revenue",
      //   data: [1, 2, 6],
      // },
      {
        name: "Customers",
        data: [
          twoDayBeforeUsers ? twoDayBeforeUsers.length : 0,
          yesterdayUsers ? yesterdayUsers.length : 0,
          todayUsers ? todayUsers.length : 0,
        ],
      },
    ],

    options: {
      chart: {
        height: "100%",
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },

      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradeient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },

      xaxis: {
        type: "category",
        categories: [
          `${short.format(twoDayBeforeDate).substring(0, 7)}`,
          `${short.format(yesterdayDate).substring(0, 7)}`,
          `${short.format(todayDate).substring(0, 7)}`,

          // yesterday,
          // today
          // "2024-03-10T00:00:00.000Z"
        ],
      },

      tooltip: {
        x: {
          format: "dd/mm/yy ",
        },
      },
    },
  });

  return (
    <div className="grid  grid-cols-12 gap-4">
      <Chart
        options={data.options}
        series={data.series}
        width="100%"
        height={data.options.chart.height}
        type={data.options.chart.type}
        className=" bg-white shadow-md  h-[300px] col-span-8 "
      />

      <DBReviews className=" bg-white shadow-md" />
    </div>
  );
};

export default DBHomeReport;
