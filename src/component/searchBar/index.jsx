import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  countries,
  setFilteredCountries,
  isFavoritesView,
  className,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (setFilteredCountries) {
      if (isFavoritesView) {
        setFilteredCountries(
          countries
            .filter((country) => favorites.includes(country.cur_unit))
            .filter(
              (country) =>
                country.cur_nm
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                country.cur_unit
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
        );
      } else {
        setFilteredCountries(
          countries.filter(
            (country) =>
              country.cur_nm.toLowerCase().includes(searchTerm.toLowerCase()) ||
              country.cur_unit.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }
    navigate(`/?search=${searchTerm}&searchAfterScroll=true`);
  };

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={`search-container ${className}`}>
      <input
        placeholder="나라/통화를 검색하세요."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={onSubmitSearch}
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
}
