import "../../style/common.css";
import "../../style/countryPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useExchangeRate from "../../hook/useExchangeRate";
import SideBar from "../../component/sideBar";
import useToNumber from "../../hook/useToNumber";

export default function CountryPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();

  const country = countries.find((country) => country.cur_unit === cur_unit);

  const [krwValue, setKrwValue] = useState("");
  const [foreignValue, setForeignValue] = useState("");

  //배경색 임시 수정
  document.body.classList.remove("light");

  const handleKrwChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
    setKrwValue(e.target.value);
    if (value && dealBasR) {
      setForeignValue((value / dealBasR).toFixed(2));
    } else {
      setForeignValue("");
    }
  };

  const handleForeignChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
    setForeignValue(e.target.value);
    if (value && dealBasR) {
      setKrwValue((value * dealBasR).toFixed(2));
    } else {
      setKrwValue("");
    }
  };

  const handleIncrement = (increment) => {
    const currentForeignValue = parseFloat(foreignValue.replace(/,/g, "")) || 0;
    const newForeignValue = (currentForeignValue + increment).toFixed(2);
    setForeignValue(newForeignValue);
    const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
    setKrwValue((newForeignValue * dealBasR).toFixed(2));
  };

  const handleMultiply = (multiplier) => {
    const currentForeignValue = parseFloat(foreignValue.replace(/,/g, "")) || 0;
    const newForeignValue = (currentForeignValue * multiplier).toFixed(2);
    setForeignValue(newForeignValue);
    const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
    setKrwValue((newForeignValue * dealBasR).toFixed(2));
  };

  useEffect(() => {
    if (country && country.deal_bas_r) {
      const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
      const initialForeignValue = 1; // 외국 통화 단위를 1로 설정
      setForeignValue(initialForeignValue.toString());
      setKrwValue((initialForeignValue * dealBasR).toFixed(2));
    }
  }, [country]);

  useEffect(() => {
    document.body.classList.add("countryPage", "transition");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("countryPage", "transition");
    };
  }, []);

  if (!country) {
    return <div>Loading...</div>;
  }

  const currencyNameParts = country.cur_nm.split(" ");
  const foreignCurrencyUnit =
    currencyNameParts.length > 1 ? currencyNameParts[1] : currencyNameParts[0];

  return (
    <div className="countryPage">
      <SideBar curUnit={cur_unit} />
      <h1>🌐 {country.cur_nm}</h1>
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
      </div>
      <div className="calculator">
        <h2>환율 계산 💶</h2>
        <div className="calculatorContainer">
          <div className="beforeContainer">
            <label>KRW:</label>
            <input
              className="before"
              value={krwValue}
              onChange={handleKrwChange}
              type="text"
            />
            <span> 원</span>
          </div>
          <div className="afterContainer">
            <label>{country.cur_unit}:</label>
            <input
              className="after"
              value={foreignValue}
              onChange={handleForeignChange}
              type="text"
            />
            <span> {foreignCurrencyUnit}</span>
            <div className="addButtonContainer">
              <button onClick={() => handleIncrement(1)}>+1</button>
              <button onClick={() => handleIncrement(5)}>+5</button>
              <button onClick={() => handleIncrement(10)}>+10</button>
              <button onClick={() => handleMultiply(10)}>x10</button>
            </div>
            <div className="subButtonContainer">
              <button onClick={() => handleIncrement(-1)}>-1</button>
              <button onClick={() => handleIncrement(-5)}>-5</button>
              <button onClick={() => handleIncrement(-10)}>-10</button>
              <button onClick={() => handleMultiply(0.1)}>/10</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
