import { useEffect, useRef, useState } from "react";
import type { ServerMessage, RankingEntry } from "../types";
import { WS_URL } from "../config";          

export function useTelaoSocket(sessionId: string) {
  const ws = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<"waiting" | "playing" | "result">("waiting");
  const [playerName, setPlayerName] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    if (!sessionId) return;

    const socket = new WebSocket(`${WS_URL}/ws/${sessionId}`);   
    ws.current = socket;

    socket.onmessage = (event) => {
      const data: ServerMessage = JSON.parse(event.data);

      switch (data.type) {
        case "started":
          setPlayerName(data.name);
          setElapsedMs(0);
          setStatus("playing");
          break;
        case "tick":
          setElapsedMs(data.elapsed_ms);
          break;
        case "finished":
          setElapsedMs(data.elapsed_ms);
          setRanking(data.ranking);
          setStatus("result");
          break;
      }
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [sessionId]);

  return { status, playerName, elapsedMs, ranking };
}