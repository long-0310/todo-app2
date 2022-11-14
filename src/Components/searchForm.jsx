import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchForm({ handleSearch }) {
  return (
    <div className="sm:w-2/3 sm:mr-2  mb-2">
      {" "}
      <input
        className="w-full  px-4 h-[40px] rounded-lg border-[1px] outline-0 border-b-gray3 "
        type="text"
        placeholder="Search your task..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchForm;
