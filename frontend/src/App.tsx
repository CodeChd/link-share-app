import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Toaster position="bottom-right" />
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
