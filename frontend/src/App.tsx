import { Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
