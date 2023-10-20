import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && <Header />}
      <main className="min-h-[80vhvh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
