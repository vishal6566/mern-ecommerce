import React, { useState } from 'react'
import { Fragment } from 'react'
import "./Search.css"
import { createBrowserHistory } from 'history';
import {useNavigate} from "react-router-dom";
import MetaData from "../layout/MetaData";
const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate=useNavigate()
const history=createBrowserHistory()
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
      navigate(`/products/${keyword}`)
    } else {
      history.push("/products");
      navigate("/products")
    }
  };
  return (
    <Fragment>
      <MetaData title="SEARCH A PRODUCT --ECOMMERCE" />
          <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  )
}

export default Search