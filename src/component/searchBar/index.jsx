import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/?search=${searchTerm}&searchAfterScroll=true`);
  };

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${searchTerm}&searchAfterScroll=true`);
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
