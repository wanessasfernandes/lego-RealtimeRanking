import { useEffect, useState } from "react";
import { useTelaoSocket } from "../hooks/useTelaoSocket";
import { RankingScreen } from "../components/rankingScreen";
import { API_URL } from "../config";  
import { CopyrightFooter } from "../components/footer";
import "./telaoPage.css"       

export function TelaoPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/sessions`, { method: "POST" })   
      .then((res) => res.json())
      .then((data) => setSessionId(data.session_id));
  }, []);

  const { status, playerName, elapsedMs, ranking } = useTelaoSocket(sessionId ?? "");

  if (!sessionId) return <p>Criando sessão...</p>;

  if (status === "waiting"){ 
    return (
      <div className="screen-yellow-bg">
        <div className="screen">
          <h2>Escaneie para jogar</h2>
            <img src={`${API_URL}/api/sessions/${sessionId}/qrcode`} alt="QR Code" width={180} /> 
          <p className="debug-session">Sessão #{sessionId}</p>
          <CopyrightFooter variant="dark" />
        </div>
      </div>
    );
  }

  if (status === "playing"){
    return (
      <div className="app">
        <div className="screen screen-navy">
          <p>{playerName} ESTÁ JOGANDO</p>
          <div className="timer-display">{(elapsedMs / 1000).toFixed(1)}s</div>
          <CopyrightFooter variant="dark" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="app">
      <RankingScreen ranking={ranking} playerName={playerName}/>
    </div>
  );
}