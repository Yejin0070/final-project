import { Link } from "react-router-dom";
import "../../style/countryCard.css";
import useExchangeRateStore from "../../store/store";

export default function CountryCard({ country, toggleFavorite, isFavorite }) {
  const { yesterdayCountries } = useExchangeRateStore();
  // console.log(yesterdayCountries);
  const yesterdayDeal = yesterdayCountries.find(
    (yesterdayCountry) => yesterdayCountry.cur_unit === country.cur_unit
  ).deal_bas_r;
  const Rate = ((country.deal_bas_r - yesterdayDeal) / yesterdayDeal) * 100;
  return (
    <div className="countryCardContainer">
      <div className="countryCardInformation">
        <Link to={`/country/${country.cur_unit}`} className="countryItem">
          <h3>나라이름 x 통화 이름: {country.cur_nm}</h3>
          <p>통화코드: {country.cur_unit}</p>
          <p>매매 기준율: {country.deal_bas_r}</p>
          <p>
            등락률:{" "}
            {Rate.toFixed(2) > 0 ? `+${Rate.toFixed(2)}` : Rate.toFixed(2)}%
          </p>
        </Link>
      </div>
      <div
        className="favorite"
        onClick={() => toggleFavorite(country.cur_unit)}
      >
        <input type="checkbox" checked={isFavorite} readOnly />
        <p>즐겨찾기</p>
      </div>
    </div>
  );
}
