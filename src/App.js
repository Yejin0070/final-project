import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainPage from "./page/mainPage";
import CountryPage from "./page/countryPage";
import GraphPage from "./page/graphPage";
import SideBar from "./component/sideBar";
import "./style/app.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="app">
      {!isMainPage && <SideBar />}
      <div className={!isMainPage ? "main-content" : ""}>{children}</div>
    </div>
  );
};

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
