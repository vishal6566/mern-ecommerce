import React from "react";
import logo from "../../../images/logo.png";
import { ImSearch } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="img-container">
        <img src={logo} alt="" />
      </div>
      <div className="nav-options-container">
        <p>Home</p>
        <p>Products</p>
        <p>Contact</p>
        <p>About</p>
      </div>
      <div className="icon-container">
        <button><BsFillPersonFill size={25} /></button>
        <button><ImSearch  size={25} /></button>
        <button><AiOutlineShoppingCart size={25} /></button>
      </div>
    </div>
  );
};

export default Navbar;
