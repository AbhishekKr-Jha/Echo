import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import { toggleDarkMode } from "./Redux/Reducer";
import { Link, NavLink} from "react-router-dom";

function Navbar() {
  const mode = useSelector((state) => state.darkMode.dark_mode);
const dispatch=useDispatch()
const darkMode=()=>{
dispatch(toggleDarkMode())
}
  return (
    <nav className={`w-full px-6   `}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
  

        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1 border-b-2 border-[#2E4252] pb-2"
          id="navbar-cta"
        >
          <ul className="flex flex-row font-medium px-4  py-1 mt-4 rounded-lg bg-gray-50 gap-x-6 ">
            <NavLink to="/">
              <span
                className="block py-2 px-3 md:p-0  md:hover:text-blue-700 "
                aria-current="page"
              >
              Echo
              </span>
            </NavLink>
            <NavLink to="/about">
              <span
                className="block py-2 px-3 md:p-0  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
              >
                About
              </span>
            </NavLink>
            <li className="cursor-pointer" onClick={darkMode}>
              <span
                href="#"
                className=" block py-2 px-3 md:p-0 rounded  md:hover:text-blue-700 "
              >
            {mode?"LightM":"DarkM"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
