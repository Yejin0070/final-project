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

  const handleKrwChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    const dealBasR = parseFloat(country.deal_bas_r.replace(/,/g, ""));
    // const [value, dealBasR] = useToNumber(e, country);
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

  useEffect(() => {
    if (country && country.deal_bas_r) {
      // console.log(country.deal_bas_r);
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
    // console.log("a");
    return <div>Loading...</div>;
  }

  const foreignCurrencyUnit = country.cur_nm.split(" ")[1];

  return (
    <div className="countryPage">
      <SideBar curUnit={cur_unit} />
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
      </div>
      <div className="calculator">
        <p>환율 계산</p>
        <div className="calculatorContainer">
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
    </div>
  );
}
