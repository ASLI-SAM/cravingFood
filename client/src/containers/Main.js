import React, { useEffect } from "react";
import { Cart, FilterSection, Header, Home } from "../components";
import Dashboard from "./Dashboard";
import { HomeSlider } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "./context/actions/productAction";
import { getAllProducts, getUserProfile } from "../api";
import { setUserProfile } from "../containers/context/actions/userProfileActions";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
   
  }, []);

  return (
    <main className="w-full  flex items-center  flex-col bg-primary ">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96  pb-24 gap-6">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>

      {isCart && <Cart />}
    </main>
  );
};

export default Main;
