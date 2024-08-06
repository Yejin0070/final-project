import React, { useState } from "react";

export default function SearchBar({ countries, setFilteredCountries }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.cur_nm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.cur_unit.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="searchContainer">
      <input
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
}
