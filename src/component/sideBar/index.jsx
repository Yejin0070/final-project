import "../../style/sideBar.css";
import { Link, useLocation, useParams } from "react-router-dom";
import SearchBar from "../searchBar";
import useExchangeRate from "../../hook/useExchangeRate";

export default function SideBar() {
  const { cur_unit } = useParams();
  const pathName = useLocation().pathname;
  const countries = useExchangeRate();

  return (
    <div className="side-bar">
      <Link to={"/"} className="side-bar-title">
        <h3>Exchange Rate Village</h3>
      </Link>
      <SearchBar className="side-search-bar" countries={countries} />
      <ul>
        <li
          className={
            pathName === `/country/${cur_unit}` ? "active" : "inactive"
          }
        >
          <Link to={`/country/${cur_unit}`}>환율상세 보기</Link>
        </li>
        <li
          className={
            pathName === `/calculator/${cur_unit}` ? "active" : "inactive"
          }
        >
          <Link to={`/calculator/${cur_unit}`}>환율 계산하기</Link>
        </li>
        <li
          className={pathName === `/graph/${cur_unit}` ? "active" : "inactive"}
        >
          <Link to={`/graph/${cur_unit}`}>그래프 보기</Link>
        </li>
        <li
          className={pathName === `/news/${cur_unit}` ? "active" : "inactive"}
        >
          <Link to={`/news/${cur_unit}`}>뉴스피드 보기</Link>
        </li>
      </ul>
    </div>
  );
}
