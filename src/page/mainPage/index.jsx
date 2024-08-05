import "../../style/common.css";
import "../../style/mainPage.css";
import { useState, useEffect } from "react";
import CountryCard from "../../component/countryCard";
import SearchBar from "../../component/searchBar";
import useExchangeRate from "../../hook/useExchangeRate";

export default function MainPage() {
  const countries = useExchangeRate();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesView, setIsFavoritesView] = useState(false);

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

  return (
    <div>
      <div className="header">Exchange Rate Village</div>
      <div className="main">
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
      </div>
    </div>
  );
}
