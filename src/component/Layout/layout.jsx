import SideBar from "../sideBar";
import "../../style/app.css";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <SideBar />
      <div className="core-content">{children}</div>
    </div>
  );
};

export default Layout;
