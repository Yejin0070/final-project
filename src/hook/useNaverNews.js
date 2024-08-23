import { useState, useEffect } from "react";
import axios from "axios";

const useNaverNews = (query) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/v1/search/news.json", {
          headers: {
            "X-Naver-Client-Id": process.env.REACT_APP_NAVER_API_ID,
            "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_API_KEY,
          },
          params: {
            query,
            display: 100,
            start: 1,
            sort: "sim",
          },
        });
        setNews(response.data.items);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (query) {
      fetchNews();
    }
  }, [query]);

  return { news, loading, error };
};

export default useNaverNews;
