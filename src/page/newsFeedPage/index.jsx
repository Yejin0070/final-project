import "../../style/common.css";
import "../../style/newsFeedPage.css";
import "../../style/pagination.css";
import { useParams } from "react-router-dom";
import SideBar from "../../component/sideBar";
import useExchangeRate from "../../hook/useExchangeRate";
import useNaverNews from "../../hook/useNaverNews";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

export default function NewsFeedPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries?.find((country) => country.cur_unit === cur_unit);
  const { news, loading, error } = useNaverNews(country?.cur_nm);

  const [feedList, setFeedList] = useState([]);
  const [currentFeed, setCurrentFeed] = useState([]);
  const [page, setPage] = useState(1);

  const feedPerPage = 10;
  const indexOfLastFeed = page * feedPerPage;
  const indexOfFirstFeed = indexOfLastFeed - feedPerPage;

  useEffect(() => {
    setFeedList(news);
  }, [news]);

  useEffect(() => {
    setCurrentFeed(feedList.slice(indexOfFirstFeed, indexOfLastFeed));
  }, [feedList, page, indexOfFirstFeed, indexOfLastFeed]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-feed-page">
      <SideBar curUnit={cur_unit} />
      <h1>🌐 {country.cur_nm}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {currentFeed && (
        <ul className="news-feed-list">
          {currentFeed.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-feed-title"
              key={index}
            >
              <li className="news-feed-item">
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
      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={feedPerPage}
        totalItemsCount={feedList.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        prevPageText={"‹"}
        nextPageText={"›"}
      />
    </div>
  );
}
