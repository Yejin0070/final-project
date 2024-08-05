import { useEffect } from "react";
import useExchangeRateStore from "../store/store";

export default function useExchangeRate() {
  const { countries, fetchData } = useExchangeRateStore();

  useEffect(() => {
    fetchData();
    let interval = setInterval(fetchData, 24 * 60 * 60 * 1000); //24시간
    return () => clearInterval(interval);
  }, [fetchData]);

  return countries;
}
