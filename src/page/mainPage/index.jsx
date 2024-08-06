import "../../style/common.css";
import "../../style/mainPage.css";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import CountryCard from "../../component/countryCard";
import SearchBar from "../../component/searchBar";
import useExchangeRate from "../../hook/useExchangeRate";

export default function MainPage() {
  const countries = useExchangeRate();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesView, setIsFavoritesView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const toggleFavorite = (cur_unit) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(cur_unit)) {
        return prevFavorites.filter((unit) => unit !== cur_unit);
      } else {
        return [...prevFavorites, cur_unit];
      }
    });
  };

  const showAll = () => {
    setIsFavoritesView(false);
    setFilteredCountries(countries);
  };

  const showFavorites = () => {
    setIsFavoritesView(true);
    setFilteredCountries(
      countries.filter((country) => favorites.includes(country.cur_unit))
    );
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const headerElement = document.querySelector(".header");
    const bodyElement = document.body;

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
    <div className="mainPage">
      <div className="header">Exchange Rate Village</div>
      <motion.div
        className="main"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SearchBar
          countries={countries}
          setFilteredCountries={setFilteredCountries}
        />
        <div className="mainContent">
          <div className="favoritesContainer">
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
          <div className="countryList">
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
