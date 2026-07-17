import { useEffect, useRef, useState } from "react";
import type { ServerMessage, RankingEntry, Screen } from "../types";
import { WS_URL } from "../config";          

export function useGameSocket(sessionId: string, playerId: string) {
  const ws = useRef<WebSocket | null>(null);
  const tickInterval = useRef<number | null>(null);
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
      console.log("mensagem recebida:", data)

      switch (data.type) {
        case "started": {
          setElapsedMs(0);
          setScreen("timer");

          if (tickInterval.current) clearInterval(tickInterval.current);
          tickInterval.current = window.setInterval(() => {
            setElapsedMs(Date.now() - data.start_timestamp);
          }, 100);
          break;
        }
        case "finished":
          if (tickInterval.current) {
            clearInterval(tickInterval.current);
            tickInterval.current = null;
          }
          setElapsedMs(data.elapsed_ms);
          setRanking(data.ranking);
          setScreen("result");
          break;
      }
    };

    return () => {
      socket.close();
      if (tickInterval.current) clearInterval(tickInterval.current);
    };
  }, [sessionId]);

  function join(name: string) {
    setPlayerName(name);
    ws.current?.send(JSON.stringify({ type: "join", player_id: playerId, name }));
  }

  function start(name: string) {
    ws.current?.send(JSON.stringify({ type: "start", player_id: playerId, name }));
  }

  function finish() {
    console.log("enviando finish, socket state:", ws.current?.readyState);
    ws.current?.send(JSON.stringify({ type: "finish", player_id: playerId }));
  }

  return { screen, elapsedMs, ranking, playerName, join, start, finish };
}