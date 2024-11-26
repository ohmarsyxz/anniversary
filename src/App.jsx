import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Home/page";
import AnniversaryPage from "./components/Anniversary/page";

function App() {
  return (
    <div className="bg-[#f9f9f9] h-full">
      <Routes>
        <Route path="/anniversary/" element={<HomePage />} />
        <Route path="/anniversary/page" element={<AnniversaryPage />} />
        <Route path="/" element={<Navigate to="/anniversary" />}/>
      </Routes>
    </div>
  );
}

export default App;
