import { create } from "zustand";
import { dummyData } from "./static";
// 주석은 API 사용 코드 (더미데이터는 임시)
// import axios from "axios";

const useExchangeRateStore = create((set) => ({
  countries: [],
  yesterdayCountries: [],
  fetchData: async () => {
    // try {
    //   const currentDate = getCurrentDate();
    //   const yesterdayDate = getYesterdayDate();
    // 오늘 환율
    //   const currentResponse  = await axios.post("http://localhost:3001/api/exchange", {
    //     searchdate: currentDate,
    //     authkey: "4pnxrKwL9nYsl6PqcrWElH1QQlj1f2Nk",
    //   });
    // 어제 환율
    //   const yesterdayResponse = await axios.post("http://localhost:3001/api/exchange", {
    //     searchdate: yesterdayDate,
    //     authkey: "4pnxrKwL9nYsl6PqcrWElH1QQlj1f2Nk",
    //   });
    //   set({ countries: currentResponse.data, yesterdayCountries: yesterdayResponse.data });
    // } catch (error) {
    //   console.error("Failed to fetch data:", error);
    // }

    const currentDate = getCurrentDate() % 7;
    const data = dummyData[currentDate];

    const yesterdayDate = getYesterdayDate() % 7;
    const yesterdayData = dummyData[yesterdayDate];

    set({ countries: data, yesterdayCountries: yesterdayData });
  },
}));

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

const getYesterdayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate() - 1).padStart(2, "0");

  return `${year}${month}${day}`;
};

export default useExchangeRateStore;
