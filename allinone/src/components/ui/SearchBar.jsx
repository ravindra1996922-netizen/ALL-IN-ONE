import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="position-relative">
      <FiSearch
        className="position-absolute"
        style={{ top: "50%", left: "10px", transform: "translateY(-50%)" }}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control ps-5"
        style={{ width: "250px" }}
      />
    </div>
  );
};

export default SearchBar;
