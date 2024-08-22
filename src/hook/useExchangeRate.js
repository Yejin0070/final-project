import { useEffect } from "react";
import useExchangeRateStore from "../store/store";

export default function useExchangeRate() {
  const { countries, fetchData } = useExchangeRateStore();

  useEffect(() => {
    fetchData();

    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const timeUntilMidnight = nextMidnight - now;

    const timeout = setTimeout(() => {
      fetchData();
    }, timeUntilMidnight); // 자정에 데이터 갱신

    return () => clearTimeout(timeout);
  }, [fetchData]);

  return countries;
}
