const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const apiUrl =
  "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

// 프록시 엔드포인트 설정
app.post("/api/exchange", async (req, res) => {
  const { searchdate, authkey } = req.body;
  try {
    const response = await axios.get(
      `${apiUrl}?authkey=${authkey}&searchdate=${searchdate}&data=AP01`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
