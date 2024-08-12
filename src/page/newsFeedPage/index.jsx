import "../../style/common.css";
import "../../style/newsFeedPage.css";
import { useParams } from "react-router-dom";
import SideBar from "../../component/sideBar";
import useExchangeRate from "../../hook/useExchangeRate";
import useNaverNews from "../../hook/useNaverNews";

export default function NewsFeedPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries.find((country) => country.cur_unit === cur_unit);
  const { news, loading, error } = useNaverNews(country.cur_nm);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="graphPage">
      <SideBar curUnit={cur_unit} />
      <h1>🌐 {country.cur_nm}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {news && (
        <ul className="news-feed-list">
          {news.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-feed-title"
            >
              <li key={index} className="news-feed-item">
                <span dangerouslySetInnerHTML={{ __html: item.title }} />

                <p
                  className="news-feed-description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}
