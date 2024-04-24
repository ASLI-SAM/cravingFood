import React, { useEffect } from "react";
import { DBLeftSection, DBRightSection } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "./context/actions/allUsersAction";

const Dashboard = () => {
  const getAllUser = useSelector((state) => state.allUsers);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!getAllUser) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);
  return (
    <div className="w-full h-screen flex items-center bg-gray-100">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
