import "../../style/common.css";
import "../../style/countryPage.css";
import { useParams } from "react-router-dom";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CountryPage() {
  const { cur_unit } = useParams();
  const { countries } = useStore();

  const country = countries.find((country) => country.cur_unit === cur_unit);

  const [krwValue, setKrwValue] = useState("");
  const [foreignValue, setForeignValue] = useState("");

  const handleKrwChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setKrwValue(e.target.value);
    if (value && country?.deal_bas_r) {
      setForeignValue((value / country.deal_bas_r).toFixed(2));
    } else {
      setForeignValue("");
    }
  };

  const handleForeignChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    setForeignValue(e.target.value);
    if (value && country?.deal_bas_r) {
      setKrwValue((value * country.deal_bas_r).toFixed(2));
    } else {
      setKrwValue("");
    }
  };

  useEffect(() => {
    if (country && country.deal_bas_r) {
      const initialForeignValue = 1; // 외국 통화 단위를 1로 설정
      setForeignValue(initialForeignValue.toString());
      setKrwValue((initialForeignValue * country.deal_bas_r).toFixed(2));
    }
  }, [country]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const foreignCurrencyUnit = country.cur_nm.split(" ")[1];

  return (
    <div className="countryPage">
      <div className="moveToMainpageContainer">
        <Link to={`/`}>목록 보기</Link>
      </div>
      <h1>{country.cur_nm}</h1>
      <div className="countryImformationContainer">
        <h2>{country.cur_unit}</h2>
        <ul>
          <li>매매 기준율: {country.deal_bas_r}</li>
          <li>장부 가격: {country.bkpr}</li>
          <li>전신환 매입율: {country.ttb}</li>
          <li>전신환 매도율: {country.tts}</li>
          <li>1년 만기 외화 예금 이율: {country.yy_efee_r}</li>
          <li>10일 만기 외화 예금 이율: {country.ten_dd_efee_r}</li>
          <li>매매 기준율(한국금융투자협회): {country.kftc_deal_bas_r}</li>
          <li>장부 가격(한국금융투자협회): {country.kftc_bkpr}</li>
        </ul>
        <div className="graphViewContainer">
          <Link to={`/graph/${country.cur_unit}`}>그래프 보기</Link>
        </div>
      </div>
      <div className="calculator">
        <p>환율 계산</p>
        <div className="beforeContainer">
          <label>KRW:</label>
          <input
            className="before"
            value={krwValue}
            onChange={handleKrwChange}
            type="number"
          />
          <span> 원</span>
        </div>
        <div className="afterContainer">
          <label>{country.cur_unit}:</label>
          <input
            className="after"
            value={foreignValue}
            onChange={handleForeignChange}
            type="number"
          />
          <span> {foreignCurrencyUnit}</span>
        </div>
      </div>
    </div>
  );
}
