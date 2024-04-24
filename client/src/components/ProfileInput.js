import React from "react";

const ProfileInput = ({ label, value, handleInput, update }) => {
  return (
    <>
      {update && label !== 'Email'? (
        <div className="flex gap-4 text-xl justify-between items-center ">
          <p className="font-semibold">{label}</p>
          <input
            type="text"
            value={value}
            className="outline-blue-800 border border-gray-400 rounded-md text-[14pt] w-[20rem] py-2 px-2 "
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-4 text-xl justify-between items-center ">
            <p className="font-semibold">{label}</p>
            <input
              type="text"
              value={value}
              className="outline-blue-800 border border-gray-400 rounded-md text-[14pt] w-[20rem] py-2 px-2 "
              onChange={(e) => handleInput(e.target.value)}
              disabled
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInput;
