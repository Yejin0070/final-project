import "../../style/common.css";
import "../../style/countryPage.css";
import { useParams } from "react-router-dom";
import useStore from "../../store/store";
import { Link } from "react-router-dom";

export default function CountryPage() {
  const { cur_unit } = useParams();
  const { countries } = useStore();

  const country = countries.find((country) => country.cur_unit === cur_unit);

  return (
    <div className="countryPage">
      <div className="countryImformationContainer">
        <h1>{country.cur_nm}</h1>
        <h2>{country.cur_unit}</h2>
        <ul>
          <li>매매 기준율: {country.deal_bas_r}</li>
          <li>장부 가격: {country.bkpr}</li>
          <li>전신환 매입율: {country.ttb}</li>
          <li>전신환 매도율: {country.tts}</li>
          <li>1년 만기 외화 예금 이율: {country.yy_efee_r}</li>
          <li>10일 만기 외화 예금 이율: {country.ten_dd_efee_r}</li>
          <li>메매 기준율:(한국금융투자협회): {country.kftc_deal_bas_r}</li>
          <li>장부 가격(한국금융투자협회): {country.kftc_bkpr}</li>
        </ul>
      </div>
      <div className="graphViewContainer">
        <Link to={`/graph/${country.cur_unit}`}>그래프 보기</Link>
      </div>
      <div className="calculator">
        환율 계산
        <input className="before" />
        <input className="after" />
      </div>
    </div>
  );
}
