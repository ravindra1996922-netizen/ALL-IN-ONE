import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="position-relative">
        <FiSearch style={{ position: "absolute", left: 10, top: 9 }} />
        <input className="form-control ps-5" placeholder="Search..." />
      </div>
    </>
  );
};

export default SearchBar;
