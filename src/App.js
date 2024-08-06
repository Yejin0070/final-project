import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./page/mainPage";
import CountryPage from "./page/countryPage";
import GraphPage from "./page/graphPage";
import Layout from "./component/Layout/layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/country/:cur_unit"
          element={
            <Layout>
              <CountryPage />
            </Layout>
          }
        />
        <Route
          path="/graph/:cur_unit"
          element={
            <Layout>
              <GraphPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
