import { useEffect, useRef, useState } from "react";
import type { ServerMessage, RankingEntry } from "../types";
import { WS_URL } from "../config";          

export function useTelaoSocket(sessionId: string) {
  const ws = useRef<WebSocket | null>(null);
  const tickInterval = useRef<number | null>(null);
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
        case "started": {
          setPlayerName(data.name);
          setElapsedMs(Date.now() - data.start_timestamp);
          setStatus("playing");

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
          setStatus("result");
          break;
      }
    };

    return () => {
      socket.close();
      if (tickInterval.current) clearInterval(tickInterval.current);
    };
  }, [sessionId]);

  return { status, playerName, elapsedMs, ranking };
}