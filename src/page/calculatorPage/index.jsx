import "../../style/common.css";
import "../../style/calculatorPage.css";
import { useState, useEffect } from "react";
import useExchangeRate from "../../hook/useExchangeRate";
import { useParams } from "react-router-dom";

export default function CalculatorPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries.find((country) => country.cur_unit === cur_unit);
  const [krwValue, setKrwValue] = useState("");
  const [foreignValue, setForeignValue] = useState("");

  const parseInputValue = (value) => parseFloat(value.replace(/,/g, "")) || 0;
  const formatCurrencyValue = (value) => value.toFixed(2);

  //환율 변환
  const handleKrwChange = (e) => {
    const value = parseInputValue(e.target.value);
    const dealBasR = parseInputValue(country.deal_bas_r);
    setKrwValue(e.target.value);
    setForeignValue(value ? formatCurrencyValue(value / dealBasR) : "");
  };

  const handleForeignChange = (e) => {
    const value = parseInputValue(e.target.value);
    const dealBasR = parseInputValue(country.deal_bas_r);
    setForeignValue(e.target.value);
    setKrwValue(value ? formatCurrencyValue(value * dealBasR) : "");
  };

  //계산 버튼
  const handleIncrement = (increment) => {
    const currentForeignValue = parseInputValue(foreignValue);
    const newForeignValue = formatCurrencyValue(
      currentForeignValue + increment
    );
    setForeignValue(newForeignValue);
    const dealBasR = parseInputValue(country.deal_bas_r);
    setKrwValue(formatCurrencyValue(newForeignValue * dealBasR));
  };

  const handleMultiply = (multiplier) => {
    const currentForeignValue = parseInputValue(foreignValue);
    const newForeignValue = formatCurrencyValue(
      currentForeignValue * multiplier
    );
    setForeignValue(newForeignValue);
    const dealBasR = parseInputValue(country.deal_bas_r);
    setKrwValue(formatCurrencyValue(newForeignValue * dealBasR));
  };

  useEffect(() => {
    if (country && country.deal_bas_r) {
      const dealBasR = parseInputValue(country.deal_bas_r);
      const initialForeignValue = 1; // 외국 통화 단위를 1로 설정
      setForeignValue(initialForeignValue.toString());
      setKrwValue(formatCurrencyValue(initialForeignValue * dealBasR));
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
      <h1>🌐 {country.cur_nm}</h1>
      <div className="calculator">
        <h2>환율 계산 💶</h2>
        <div className="calculator-container">
          <div className="krw-container">
            <label>KRW:</label>
            <input
              className="krw"
              value={krwValue}
              onChange={handleKrwChange}
              type="text"
            />
            <span> 원</span>
          </div>
          <div className="foreign-container">
            <label>{country.cur_unit}:</label>
            <input
              className="foreign"
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
