import React, { useState } from 'react'
import { Fragment } from 'react'
import "./Search.css"
import { createBrowserHistory } from 'history';
const Search = () => {
    const [keyword, setKeyword] = useState("");
const history=createBrowserHistory()
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
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