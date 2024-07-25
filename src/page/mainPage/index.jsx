import "../../style/common.css";
import "../../style/mainPage.css";
import { useEffect } from "react";
import useStore from "../../store/store";
import CountryCard from "../../component/countryCard";

export default function MainPage() {
  const { countries, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="header">Exchange Rate Village</div>
      <div className="main">
        {/* 검색바 */}
        <div className="searchContainer">
          <input placeholder="검색어를 입력하세요."></input>
          <button>검색</button>
        </div>
        <div className="countryList">
          {countries.map((country) => (
            <CountryCard key={country.cur_unit} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}
