import { useEffect, useState } from "react";
import { useTelaoSocket } from "../hooks/useTelaoSocket";
import { RankingScreen } from "../components/rankingScreen";
import { API_URL } from "../config";         

export function TelaoPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/sessions`, { method: "POST" })   // ← trocado
      .then((res) => res.json())
      .then((data) => setSessionId(data.session_id));
  }, []);

  const { status, playerName, elapsedMs, ranking } = useTelaoSocket(sessionId ?? "");

  if (!sessionId) return <p>Criando sessão...</p>;

  return (
    <div className="app">
      {status === "waiting" && (
        <div className="screen screen-yellow">
          <h2>Escaneie para jogar</h2>
          <img src={`${API_URL}/api/sessions/${sessionId}/qrcode`} alt="QR Code" width={180} />  {/* ← trocado */}
          <p className="debug-session">Sessão #{sessionId}</p>
        </div>
      )}

      {status === "playing" && (
        <div className="screen screen-navy">
          <p>{playerName.toUpperCase()} ESTÁ JOGANDO</p>
          <div className="timer-display">{(elapsedMs / 1000).toFixed(1)}s</div>
        </div>
      )}

      {status === "result" && <RankingScreen ranking={ranking} playerName={playerName} />}
    </div>
  );
}