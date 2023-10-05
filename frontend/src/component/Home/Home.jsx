import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"

const Home = () => {
  const alert=useAlert()
  const dispatch=useDispatch();
 const {loading,error,products,productsCount}=useSelector(state=>state.products)
  useEffect(()=>{
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct())
  },[dispatch,error,alert])

  
  return (
    <Fragment>
      {loading? <Loader />:<Fragment>
      <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
    <div id="container">
    <h2 className="homeHeading">Featured Product</h2>
      <div className="container" >
       {products && products.map((product) =>(
         <Product product={product} key={product._id} />
       ))}
       
        
      </div>
    </div>
    </Fragment>}
    </Fragment>
  );
};

export default Home;
