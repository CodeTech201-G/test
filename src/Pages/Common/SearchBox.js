import React from "react";
import Searchicon from "../../Static/Assets/search.png";
import "./Searchbox.css";
const SearchBox = ({ onSearchValue, searchVal, placeholder, disable }) => {
  return (
    <div>
      <div className="input-group col-12 searchsection p-0 ">
        <input
          className="form-control rounded shadow border float-right"
          type="search"
          onChange={onSearchValue}
          placeholder={placeholder}
          value={searchVal}
          id="example-search-input"
          disabled={disable}
        />
        <span>
          <img
            className="search_icon"
            alt="search-logo"
            src={Searchicon}
            width="16px"
            height="16px"
          ></img>
        </span>
        <span className="input-group-append"></span>{" "}
      </div>{" "}
    </div>
  );
};
export default SearchBox;
