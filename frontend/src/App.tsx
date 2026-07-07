import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TelaoPage } from "./pages/telaoPage";
import { PlayerPage } from "./pages/playerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaoPage />} />
        <Route path="/jogar/:sessionId" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;