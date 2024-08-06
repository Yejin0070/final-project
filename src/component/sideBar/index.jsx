import "../../style/sideBar.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function SideBar() {
  const { cur_unit } = useParams();
  const pathName = useLocation().pathname;

  return (
    <div className="sideBar">
      <h3>Exchange Rate Village</h3>
      <ul>
        <li className={pathName === "/" ? "active" : ""}>
          <Link to="/">나라 전체 보기</Link>
        </li>
        <li className={pathName === `/country/${cur_unit}` ? "active" : ""}>
          <Link to={`/country/${cur_unit}`}>환율 상세 보기</Link>
        </li>
        <li className={pathName === `/graph/${cur_unit}` ? "active" : ""}>
          <Link to={`/graph/${cur_unit}`}>그래프 보기</Link>
        </li>
      </ul>
    </div>
  );
}
