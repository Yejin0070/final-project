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
            "X-Naver-Client-Id": "RdL6pftIupoXG920Saqc",
            "X-Naver-Client-Secret": "z_19seQgMz",
          },
          params: {
            query,
            display: 30,
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
