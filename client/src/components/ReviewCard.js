import React from "react";
import { FaStar } from "../assets/icons";
import { Avatar } from "../assets";

const ReviewCard = ({ data }, { key }) => {
  console.log(data.order_id);
  const d = data.order_id;
  const totalStars = [];
  const date = new Date(Number(d));

  const f = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  for (let i = 0; i < Number(data.stars); i++) {
    totalStars.push(<FaStar />);
  }

  return (
    <div className="flex items-center justify-start gap-6 w-full border-b border-gray-300 rounded-md p-1">
      <img
        src={data.picture ? data.picture : Avatar}
        alt=""
        className="rounded-full w-[40px] h-[40px]"
      />
      <div className="flex items-start flex-col w-full">
        <p className="text-base text-[13pt] text-gray-600 font-semibold">
          {data.review}
        </p>
        <div className="flex items-center gap-3 w-full">
          <p className="font-bold">{data.stars}</p>
          <div className="flex  text-yellow-500 ">{totalStars}</div>
          <p className="text-base font-bold text-[8.9pt] text-gray-600 ">
            {f.format(date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
