import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./page/mainPage";
import CountryPage from "./page/countryPage";
import CalculatorPage from "./page/calculatorPage";
import GraphPage from "./page/graphPage";
import Layout from "./component/Layout/layout";
import NewsFeedPage from "./page/newsFeedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/country/:cur_unit"
          element={
            // <Layout>
            //   <CountryPage />
            // </Layout>
            <Layout children={<CountryPage />} />
          }
        />
        <Route
          path="/calculator/:cur_unit"
          element={<Layout children={<CalculatorPage />} />}
        />
        <Route
          path="/graph/:cur_unit"
          element={<Layout children={<GraphPage />} />}
        />
        <Route
          path="/news/:cur_unit"
          element={<Layout children={<NewsFeedPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
