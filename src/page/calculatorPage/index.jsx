import "../../style/common.css";
import "../../style/calculatorPage.css";
import { useState, useEffect } from "react";
import useExchangeRate from "../../hook/useExchangeRate";
import { useParams } from "react-router-dom";
import SideBar from "../../component/sideBar";

export default function CalculatorPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries.find((country) => country.cur_unit === cur_unit);
  const [krwValue, setKrwValue] = useState("");
  const [foreignValue, setForeignValue] = useState("");

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

  if (!country) {
    return <div>Loading...</div>;
  }

  const currencyNameParts = country.cur_nm.split(" ");
  const foreignCurrencyUnit =
    currencyNameParts.length > 1 ? currencyNameParts[1] : currencyNameParts[0];
  return (
    <div className="calculator-page">
      <SideBar curUnit={cur_unit} />
      <h1>🌐 {country.cur_nm}</h1>
      <div className="calculator">
        <h2>환율 계산 💶</h2>
        <div className="calculator-container">
          <div className="before-container">
            <label>KRW:</label>
            <input
              className="before"
              value={krwValue}
              onChange={handleKrwChange}
              type="text"
            />
            <span> 원</span>
          </div>
          <div className="after-container">
            <label>{country.cur_unit}:</label>
            <input
              className="after"
              value={foreignValue}
              onChange={handleForeignChange}
              type="text"
            />
            <span> {foreignCurrencyUnit}</span>
            <div className="add-button-container">
              <button onClick={() => handleIncrement(1)}>+1</button>
              <button onClick={() => handleIncrement(5)}>+5</button>
              <button onClick={() => handleIncrement(10)}>+10</button>
              <button onClick={() => handleMultiply(10)}>x10</button>
            </div>
            <div className="sub-button-container">
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
