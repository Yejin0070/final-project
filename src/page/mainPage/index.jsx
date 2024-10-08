import "../../style/common.css";
import "../../style/mainPage.css";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLocation } from "react-router-dom";
import CountryCard from "../../component/countryCard";
import SearchBar from "../../component/searchBar";
import useExchangeRate from "../../hook/useExchangeRate";

export default function MainPage() {
  const countries = useExchangeRate();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesView, setIsFavoritesView] = useState(false);
  const controls = useAnimation();
  const headerRef = useRef(null);
  const bodyRef = useRef(document.body);
  const mainContentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    let filtered = countries;

    if (isFavoritesView) {
      filtered = filtered.filter((country) =>
        storedFavorites.includes(country.cur_unit)
      );
    }

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");
    if (searchQuery) {
      filtered = filtered.filter(
        (country) =>
          country.cur_nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.cur_unit.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);

    if (queryParams.get("searchAfterScroll")) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [countries, location.search, isFavoritesView]);

  const toggleFavorite = (cur_unit) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(cur_unit)
        ? prevFavorites.filter((unit) => unit !== cur_unit)
        : [...prevFavorites, cur_unit];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const showFavorites = () => {
    setIsFavoritesView(true);
  };

  const showAll = () => {
    setIsFavoritesView(false);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const headerElement = headerRef.current;
    const bodyElement = bodyRef.current;

    if (scrollY > 50) {
      headerElement.classList.add("small");
      bodyElement.classList.add("light");
      controls.start({ opacity: 1, y: 0 });
    } else {
      headerElement.classList.remove("small");
      bodyElement.classList.remove("light");
      controls.start({ opacity: 0, y: 50 });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <div className="main-page">
      <div className="header" ref={headerRef}>
        Exchange Rate Village
      </div>
      <motion.div
        className="main-search-bar"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SearchBar
          countries={countries}
          setFilteredCountries={setFilteredCountries}
          isFavoritesView={isFavoritesView}
        />
        <div className="main-content" ref={mainContentRef}>
          <div className="favorites-container">
            <button
              onClick={showAll}
              className={!isFavoritesView ? "active" : ""}
            >
              전체
            </button>
            <button
              onClick={showFavorites}
              className={isFavoritesView ? "active" : ""}
            >
              즐겨찾기
            </button>
          </div>
          <div className="country-list">
            {isFavoritesView && filteredCountries.length === 0 ? (
              <div>즐겨찾기 된 나라가 없습니다</div>
            ) : (
              filteredCountries.map((country) => (
                <CountryCard
                  key={country.cur_unit}
                  country={country}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(country.cur_unit)}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
