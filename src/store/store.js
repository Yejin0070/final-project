import { create } from "zustand";
import { dummyData } from "./static";
// import axios from "axios";

const useExchangeRateStore = create((set) => ({
  countries: [],
  fetchData: async () => {
    // try {
    //   const currentDate = getCurrentDate();
    //   const response = await axios.post("http://localhost:3001/api/exchange", {
    //     searchdate: currentDate,
    //     authkey: "4pnxrKwL9nYsl6PqcrWElH1QQlj1f2Nk",
    //   });
    //   set({ countries: response.data });
    // } catch (error) {
    //   console.error("Failed to fetch data:", error);
    // }
    const currentData = getCurrentDate() % 7;
    const data = dummyData[currentData];

    set({ countries: data });
  },
}));

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

export default useExchangeRateStore;
