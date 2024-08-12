import "../../style/common.css";
import "../../style/countryPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useExchangeRate from "../../hook/useExchangeRate";
import SideBar from "../../component/sideBar";

export default function CountryPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();

  const country = countries.find((country) => country.cur_unit === cur_unit);

  //배경색 임시 수정
  document.body.classList.remove("light");

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
    </div>
  );
}
