import Header from '../components/header';
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <Header />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;