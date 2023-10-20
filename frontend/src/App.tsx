import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
