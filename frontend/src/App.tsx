import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TelaoPage } from "./pages/telaoPage";
import { PlayerPage } from "./pages/playerPage";
import { StyleGuidePage } from "./pages/styleGuidePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaoPage />} />
        <Route path="/jogar/:sessionId" element={<PlayerPage />} />
        {import.meta.env.DEV && <Route path="/dev/estilos" element={<StyleGuidePage />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;