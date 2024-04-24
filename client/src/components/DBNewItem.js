import React, { useState } from "react";
import { categories } from "../utils/styles";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { MainLoader } from "../components";
import { storage } from "../config/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  alertSuccess,
  alertDanger,
  alertNull,
} from "../containers/context/actions/alertActions";
import { buttonClick } from "../animation";
import { motion } from "framer-motion";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../containers/context/actions/productAction";

const DBNewItem = () => {
  const [itemName, setitemName] = useState("");
  const [category, setcategory] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaderUrl, setImageLoaderUrl] = useState("");
  const [progress, setProgress] = useState(null);
  const [offer, setOffer] = useState(0);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageLoaderUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded successfully"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deletedRef = ref(storage, imageLoaderUrl);
    deleteObject(deletedRef).then(() => {
      setImageLoaderUrl(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image deleted successfully"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageLoaderUrl,
      offer: offer,
    };
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("new item added"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
      setImageLoaderUrl(null);
      setitemName("");
      setPrice("");
      setcategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 bg-white">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateFun={setitemName}
          stateValue={itemName}
        />
        <div className="w-full flex items-center justify-center gap-3 flex-wrap">
          {categories &&
            categories?.map((data) => (
              <p
                key={data.id}
                className={`px-4 py-3 rounded-md text-xl text-white font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-gray-400"
                    : "bg-blue-500"
                }`}
                onClick={() => setcategory(data.category)}
              >
                {data?.title}
              </p>
            ))}
        </div>
        <div className="w-full flex justify-between gap-2">
          <InputValueField
            type="number"
            placeHolder={"Item price"}
            stateFun={setPrice}
            stateValue={price}
          />
          <InputValueField
            type="number"
            placeHolder={"Offer"}
            stateFun={setOffer}
            stateValue={offer}
          />
        </div>

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <MainLoader />
              {Math.round(progress > 0) && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageLoaderUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center cursor-pointer h-full w-full">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageLoaderUrl}
                      className="w-full h-full object-contain"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-blue-500 text-xl cursor-pointer outline-none hover;shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageLoaderUrl)}
                    >
                      <MdDelete />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-9/12 py-2 rounded-md bg-blue-500 text-white text-xl font-semibold hover:bg-blue-600 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFun,
}) => {
  return (
    <div className="w-full flex flex-col">
      <p className="text-xl font-semibold mb-2"> {placeHolder}</p>
      <div className="w-full">
        <input
          type={type}
          placeholder={placeHolder}
          className="w-full px-4 py-3  bg-white  shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 "
          value={stateValue}
          onChange={(e) => stateFun(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DBNewItem;
