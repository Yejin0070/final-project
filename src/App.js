import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import MainPage from "./page/mainPage";
import CountryPage from "./page/countryPage";
import GraphPage from "./page/graphPage";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/country/:cur_unit" element={<CountryPage />} />
          <Route path="/graph/:cur_unit" element={<GraphPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
