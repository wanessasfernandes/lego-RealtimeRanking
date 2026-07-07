import { useEffect, useRef, useState } from "react";
import type { ServerMessage, RankingEntry, Screen } from "../types";
import { WS_URL } from "../config";          

export function useGameSocket(sessionId: string, playerId: string) {
  const ws = useRef<WebSocket | null>(null);
  const [screen, setScreen] = useState<Screen>("join");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (!sessionId) return;

    const socket = new WebSocket(`${WS_URL}/ws/${sessionId}`);   
    ws.current = socket;

    socket.onmessage = (event) => {
      const data: ServerMessage = JSON.parse(event.data);

      switch (data.type) {
        case "started":
          setScreen("timer");
          break;
        case "tick":
          setElapsedMs(data.elapsed_ms);
          break;
        case "finished":
          setElapsedMs(data.elapsed_ms);
          setRanking(data.ranking);
          setScreen("result");
          break;
      }
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [sessionId]);

  function join(name: string) {
    setPlayerName(name);
    ws.current?.send(JSON.stringify({ type: "join", player_id: playerId, name }));
  }

  function start() {
    ws.current?.send(JSON.stringify({ type: "start", player_id: playerId, name: playerName }));
  }

  function finish() {
    ws.current?.send(JSON.stringify({ type: "finish", player_id: playerId }));
  }

  return { screen, elapsedMs, ranking, playerName, join, start, finish };
}