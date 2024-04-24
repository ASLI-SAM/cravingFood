import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { ProfileInput } from "../components";
import { getUserProfile, updateUserProfile } from "../api";
import { setUserProfile } from "../containers/context/actions/userProfileActions";
import {
  alertSuccess,
  alertWarning,
} from "../containers/context/actions/alertActions";
import { Avatar } from "../assets";
import { CiEdit } from "react-icons/ci";
import { VscSaveAs } from "react-icons/vsc";

const MyProfile = () => {
  const orders = useSelector((state) => state.orders);
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

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });
  const short = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  const yesterdayOrders = orders?.filter(
    (item) => item.date.split("T")[0] === yesterday
  );
  const twoDayBeforeOrders = orders?.filter(
    (item) => item.date.split("T")[0] === twoDayBefore
  );
  const todayOrders = orders?.filter(
    (item) => item.date.split("T")[0] === today
  );
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate());
  const yesterdayDate = new Date().setDate(todayDate.getDate() - 1);
  const twoDayBeforeDate = new Date().setDate(todayDate.getDate() - 2);
  const [data, setData] = useState({
    series: [
      {
        name: "Sales",
        // data: [
        //   twoDayBeforeOrders !== undefined ? twoDayBeforeOrders.length : 0,
        //   yesterdayOrders !== undefined ? yesterdayOrders.length : 0,
        //   todayOrders !== undefined ? todayOrders.length : 0,
        // ],
        data: [1, 2, 1],
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

  const userProfile = useSelector((state) => state.userProfile);
  const [saveState, setSaveState] = useState(false);
  const [name, setName] = useState(userProfile[0]?.user_name);
  const [number, setNumber] = useState(userProfile[0]?.contactno);
  const [email, setEmail] = useState(userProfile[0]?.email);
  const [street, setStreet] = useState(userProfile[0]?.street);
  const [city, setCity] = useState(userProfile[0]?.city);
  const [pinCode, setPinCode] = useState(userProfile[0]?.pincode);
  const [state, setState] = useState(userProfile[0]?.state);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleUpdate = () => {
    setSaveState((e) => !e);
    const data = {
      name,
      number,
      email,
      street,
      city,
      pinCode,
      state,
    };
    updateUserProfile(data);
    dispatch(alertSuccess("Profile Updated"));
  };
  return (
    <div className="w-full h-[36rem]  bg-white rounded-xl  shadow-lg">
      <div className="px-[6rem] py-[2rem]">
        <div className="flex justify-between">
          <h3 className="text-4xl">My Profile</h3>
          <div className="flex gap-4">
            {saveState ? (
              <>
                <h1
                  className="flex justify-center items-center w-[5rem] bg-gray-600 text-white rounded-md font-semibold text-[14pt] cursor-pointer"
                  onClick={handleUpdate}
                >
                  <VscSaveAs className="text-[17pt]" />
                  Save
                </h1>
              </>
            ) : (
              <>
                <h1
                  className="flex justify-center items-center w-[5rem] bg-orange-600 text-white rounded-md font-semibold text-[14pt] cursor-pointer"
                  onClick={() => setSaveState((e) => !e)}
                >
                  <CiEdit className="text-[20pt]" />
                  Edit
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="h-[3px] bg-blue-700 mt-2 rounded-md"></div>
      </div>
      <div>
        <div className="flex justify-center items-center w-full py-[1rem]">
          <div className="flex flex-col gap-4 w-full pl-[10rem]">
            <ProfileInput
              label="Name"
              value={name}
              handleInput={setName}
              update={saveState}
            />
            <ProfileInput
              label="Contact Number"
              value={number}
              handleInput={setNumber}
              update={saveState}
            />
            <ProfileInput
              label={"Email"}
              value={email}
              handleInput={setEmail}
              update={saveState}
            />
            <ProfileInput
              label={"Street"}
              value={street}
              handleInput={setStreet}
              update={saveState}
            />
            <ProfileInput
              label={"City"}
              value={city}
              handleInput={setCity}
              update={saveState}
            />
            <ProfileInput
              label={"Pin Code"}
              value={pinCode}
              handleInput={setPinCode}
              update={saveState}
            />
            <ProfileInput
              label={"State"}
              value={state}
              handleInput={setState}
              update={saveState}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-start gap-8 px-8">
            <div className="shadow-md w-full flex justify-center">
              <img
                src={user?.picture ? user?.picture : Avatar}
                alt=""
                className="h-[120px] w-[120px] rounded-full"
              />
            </div>
            <div className="w-full shadow-md">
              <h1 className="text-xl text-blue-600 font-semibold ml-4">
                Your Orders{" "}
              </h1>
              <Chart
                options={data.options}
                series={data.series}
                width="100%"
                height={data.options.chart.height}
                type={data.options.chart.type}
                className=" bg-white shadow-md  h-[200px] col-span-8 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
