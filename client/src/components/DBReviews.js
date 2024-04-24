import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReviews } from "../api";
import { setReviews } from "../containers/context/actions/reviewActions";
import {ReviewCard} from "../components";

const DBReviews = () => {
  const user = useSelector((state) => state.user);
  const review = useSelector((state) => state.reviews);
  const allUsers = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!review) {
      getReviews().then((data) => {
        dispatch(setReviews(data.data.data));
      });
    }
  }, []);
  return (
    <div className="w-full flex flex-col  items-start gap-2 bg-white shadow-md col-span-4 p-4 overflow-auto max-h-[300px] ">
      {review ? (
        <>
          {review.map((item, i) => (
            <ReviewCard key={i} index={i} data={item} admin={true} />
          ))}
          
        </>
      ) : (
        <></>
      )}
      {/* <div className="flex items-center justify-evenly gap-2 w-full border-b border-gray-300 rounded-md p-1">
        <img
          src={user.picture}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
        />
        <div className="flex items-center flex-col">
          <p className="text-base text-[13pt] text-gray-600 font-semibold">
            The excellent dishes provider
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-bold">4.0</p>
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2 w-full border-b border-gray-300 rounded-md p-1">
        <img
          src={user.picture}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
        />
        <div className="flex items-center flex-col">
          <p className="text-base text-[13pt] text-gray-600 font-semibold">
            The excellent dishes provider
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-bold">4.0</p>
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2 w-full border-b border-gray-300 rounded-md p-1">
        <img
          src={user.picture}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
        />
        <div className="flex items-center flex-col">
          <p className="text-base text-[13pt] text-gray-600 font-semibold">
            The excellent dishes provider
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-bold">4.0</p>
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2 w-full border-b border-gray-300 rounded-md p-1">
        <img
          src={user.picture}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
        />
        <div className="flex items-center flex-col">
          <p className="text-base text-[13pt] text-gray-600 font-semibold">
            The excellent dishes provider
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-bold">4.0</p>
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2 w-full border-b border-gray-300 rounded-md p-1">
        <img
          src={user.picture}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
        />
        <div className="flex items-center flex-col">
          <p className="text-base text-[13pt] text-gray-600 font-semibold">
            The excellent dishes provider
          </p>
          <div className="flex items-center gap-3 w-full">
            <p className="font-bold">4.0</p>
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DBReviews;
