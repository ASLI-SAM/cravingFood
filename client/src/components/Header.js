import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo, Avatar } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animation";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../containers/context/actions/userActions";
import { setCartOn } from "../containers/context/actions/displayCartAction";
import { setUserProfile } from "../containers/context/actions/userProfileActions";
import { setAllProducts } from "../containers/context/actions/productAction";
import { getUserProfile } from "../api";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setisMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  const userDetails = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);

  const handleMenu = () => {
    setisMenu((e) => !e);
    getUserProfile(userDetails?.user_id).then((data) => {
      console.log(userDetails?.user_id);
      dispatch(setUserProfile(data.data));
    });
  };

  const handleCartIcon = () => {
    getUserProfile(user?.user_id).then((data) => {
      dispatch(setUserProfile(data.data))
    })
  }

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between md:px-20 py-3 shadow-md bg-white">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Carving Food</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div
          {...buttonClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-text-color" onClick={handleCartIcon}/>
          {cart?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-primaryHighlight flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cart?.length}
              </p>
            </div>
          )}
        </motion.div>
        {user ? (
          <>
            <div className="relative cursor-pointer" onClick={handleMenu}>
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                className="w-48 px-6 py-4 bg-white bg-opacity-100 backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
                  {...slideTop}
                  onMouseLeave={() => setisMenu(false)}
                >
                  {user?.email === "aj.sam240814@gmail.com" && (
                    <Link
                      className="hover:text-red-500 text-xl text-textColor"
                      to={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  )}

                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="hover:text-red-500 text-xl text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...buttonClick}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-200 hover:bg-gray-100 gap-3"
                    onClick={signOut}
                  >
                    <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                    <p className="text-textColor text-xl group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-3 rounded-md shadow-md bg-white bg-opacity-10 border border-red-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
