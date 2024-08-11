import "../../style/common.css";
import "../../style/newsFeedPage.css";
import { useParams } from "react-router-dom";
import SideBar from "../../component/sideBar";
import useExchangeRate from "../../hook/useExchangeRate";
export default function NewsFeedPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries.find((country) => country.cur_unit === cur_unit);
  return (
    <div className="graphPage">
      <SideBar curUnit={cur_unit} />
      <h1>{country.cur_nm}</h1>
    </div>
  );
}
