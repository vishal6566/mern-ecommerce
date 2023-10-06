import React from "react";
import logo from "../../../images/logo.png";
import { ImSearch } from "react-icons/im";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs";
import "./Navbar.css"
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="img-container">
        <img src={logo} alt="" />
      </div>
      <div className="nav-options-container">
      <Link to="/" className="Link">  <p>Home</p></Link>
     <Link to="/products" className="Link"><p>Products</p></Link>   
        <p>Contact</p>
        <p>About</p>
      </div>
      <div className="icon-container">
        <button><BsFillPersonFill size={25} /></button>
      <Link to="/search" className="Link"> <button><ImSearch  size={25} /></button></Link> 
        <button><AiOutlineShoppingCart size={25} /></button>
      </div>
    </div>
  );
};

export default Navbar;
