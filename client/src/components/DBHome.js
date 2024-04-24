import React, { useEffect, useState } from "react";
import { DBHomeCard, DBHomeReport } from "../components";


const DBHome = () => {
  
  return (
   <div className="flex flex-col gap-6">
    <DBHomeCard />
    <DBHomeReport />
   </div>
  );
};

export default DBHome;
