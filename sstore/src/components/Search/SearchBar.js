import React from "react";

const SearchBar = () => {
  return (
    <form className="d-flex">
      <input
        className="form-control me-3"
        type="search"
        placeholder="Start typing to fillter..."
        aria-label="Search"
        style={{ borderRadius: "99px", width: "300px", border: "none" }}
      />
      <button className="btn btn-outline-dark" type="submit" style={{ borderRadius: "99px", border: "none" }}>
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;