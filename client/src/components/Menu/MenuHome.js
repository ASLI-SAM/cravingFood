import React, { useEffect, useState } from "react";
import { MenuCard } from "./index";
import Header from "../Header";
import { MdSearch, MdOutlineFilterAlt } from "../../assets/icons";
import { slideTop } from "../../animation";
import { motion } from "framer-motion";
import { categories } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../api";
import { setAllProducts } from "../../containers/context/actions/productAction";
import { notFound } from "../../assets";

const MenuHome = () => {
  const cat = categories;
  const CategoryList = [];
  cat.map((list) => {
    CategoryList.push(
      <p
        className="hover:text-red-500 text-[14pt] text-textColor cursor-pointer"
        onClick={(e) => handleSelectedCategory(list.title)}
      >
        {list.title}
      </p>
    );
  });
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryValue, setCategoryValue] = useState("Category");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchElement, setSearchElement] = useState("");
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  const handleCategory = (cat) => {
    setCategoryToggle((state) => !state);
  };
  const handleSelectedCategory = (cat) => {
    setCategoryValue(cat);
    setCategoryToggle((state) => !state);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      <Header />
      <div className="flex  mt-[5rem] p-4 gap-6 fixed w-full justify-center bg-gray-100 z-30">
        {" "}
        {/** ALL filters */}
        <div className=" border rounded-md shadow-md flex items-center bg-white">
          <MdSearch className="text-4xl pl-2 mr-2 " />
          <input
            type="text"
            placeholder="Search your taste"
            className="px-1 py-3 text-[12pt] w-[500px] border-gray-400 rounded-md  outline-none bg-white text-center"
            onChange={(e) => {
              setSearchElement(e.target.value);
            }}
          />
        </div>
        {/* <div
          className=" border rounded-md shadow-md flex items-center relative"
          onClick={handleCategory}
        >
          <MdOutlineFilterAlt className="text-3xl pl-2 text-gray-500" />
          <input
            type="button"
            value={categoryValue}
            className="w-[100px] font-semibold text-[12pt]  border-gray-400 rounded-md  outline-gray-500 bg-white bg-opacity-100 text-gray-700"
          />
          {categoryToggle && (
            <motion.div
              className="w-[120px] px-4 py-2  bg-white bg-opacity-100 backdrop-blur-md rounded-md shadow-md absolute top-[2.9rem] right-[0rem] flex flex-col gap-4"
              {...slideTop}
            >
              {CategoryList}
            </motion.div>
          )}
        </div> */}
      </div>

      <div className="mt-[13rem] w-full flex flex-wrap gap-5  justify-center ">
        {products &&
        products.filter((item) =>
          item.product_name.toLowerCase().includes(searchElement.toLowerCase())
        ).length > 0 ? (
          <>
            {products
              .filter((item) =>
                item.product_name
                  .toLowerCase()
                  .includes(searchElement.toLowerCase())
              )
              .map((item, i) => (
                <MenuCard key={i} data={item} />
              ))}
          </>
        ) : (
          <>
            <h1 className="text-[50px] text-headingColor font-bold flex flex-col items-center">
              <img src={notFound} alt="" className="w-[500] h-[250px]" />
              Sorry, We could not find you taste
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuHome;
