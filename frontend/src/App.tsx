import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/preview" && <Header />}
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
