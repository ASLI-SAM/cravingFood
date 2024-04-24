import React from "react";
import { Header, MyProfile } from "../components";

const Profile = () => {
  return (
    <main className="w-full min-h-screen flex items-center  flex-col bg-primary ">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-[8rem] px-12 gap-6">
        <MyProfile />
      </div>
    </main>
  );
};

export default Profile;
