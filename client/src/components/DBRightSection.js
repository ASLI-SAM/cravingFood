import React from "react";
import DBHeader from "./DBHeader";
import { Route, Routes } from "react-router-dom";
import {DBHome, DBItems, DBNewItem, DBOrders, DBUsers} from '../components'

const DBRightSection = () => {
  return <div className="flex flex-col   flex-1  h-full">
    <DBHeader className />
    <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none py-6 px-6">
      <Routes>
        <Route path="/home" element = {< DBHome/>} />
        <Route path="/orders" element = {< DBOrders/>} />
        <Route path="/items" element = {< DBItems/>} />
        <Route path="/newItem" element = {<DBNewItem/>} />
        <Route path="/users" element = {< DBUsers/>} />

      </Routes>
    </div>

  </div>;
};


export default DBRightSection;
