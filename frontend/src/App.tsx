import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const { pathname } = useLocation();
  const { id } = useParams();

  return (
    <>
      <Toaster position="bottom-center" />
      {pathname !== "/login" &&
        pathname !== "/register" &&
        pathname !== "/preview" &&
        pathname !== `/previews/${id}` && <Header />}
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
