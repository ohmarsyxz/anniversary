import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/page";
import AnniversaryPage from "./components/Anniversary/page";

function App() {
  return (
    <div className="bg-[#f3f3f3] h-[100vh]">
      <Routes>
        <Route path="/anniversary/" element={<HomePage />} />
        <Route path="/anniversary/page" element={<AnniversaryPage />} />
      </Routes>
    </div>
  );
}

export default App;