import "../../style/common.css";
import "../../style/graphPage.css";
import { useParams } from "react-router-dom";
import SideBar from "../../component/sideBar";
import useExchangeRate from "../../hook/useExchangeRate";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { dummyData } from "../../store/static";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GraphPage() {
  const { cur_unit } = useParams();
  const countries = useExchangeRate();
  const country = countries.find((country) => country.cur_unit === cur_unit);

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (country) {
      const getPastWeekData = () => {
        const today = new Date();
        const todayIndex = today.getDay() % 7;
        const lastSevenDays = [];

        for (let i = 0; i < 7; i++) {
          const index = (todayIndex - i + 7) % 7;
          const dayData = dummyData[index].find(
            (data) => data.cur_unit === cur_unit
          );

          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          const dayLabel = `${String(pastDate.getDate()).padStart(2, "0")}일`;

          const rate = parseFloat(dayData.deal_bas_r.replace(/,/g, ""));

          lastSevenDays.unshift({
            date: dayLabel,
            rate: rate,
          });
        }

        return lastSevenDays;
      };

      const data = getPastWeekData();

      setChartData({
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: `${country.cur_nm} Exchange Rate`,
            data: data.map((d) => d.rate),
            borderColor: "rgba(0, 40, 240, 1)",
            borderWidth: 3,
            pointBackgroundColor: "rgba(0, 49, 112, 1)",
            pointBorderColor: "rgba(155, 225, 243, 1)",
            pointBorderWidth: 1,
            pointRadius: 7,
            pointHoverRadius: 9,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255, 99, 132, 1)",
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return `매매 기준율: ${tooltipItem.raw.toLocaleString()}`;
              },
            },
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: {
              ticks: {
                color: "#ffffff",
              },
            },
            y: {
              ticks: {
                color: "#ffffff",
                beginAtZero: false,
                callback: function (value) {
                  return value.toLocaleString();
                },
              },
            },
          },
        },
      });
    }
  }, [country, cur_unit]);

  return (
    <div className="graphPage">
      <SideBar curUnit={cur_unit} />
      <h1>🌐 {country?.cur_nm}</h1>
      <div className="graphContainer">
        {chartData.labels ? (
          <Line data={chartData} options={chartData.options} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
}
