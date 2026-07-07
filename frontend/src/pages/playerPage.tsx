import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGameSocket } from "../hooks/useGameSocket";
import { ScanScreen } from "../components/scanScreen";
import { TimerScreen } from "../components/timerScreen";
import { RankingScreen } from "../components/rankingScreen";

export function PlayerPage() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const playerId = useMemo(() => crypto.randomUUID(), []);

    const { screen, elapsedMs, ranking, playerName, join, start, finish } = useGameSocket(sessionId ?? "", playerId);

    if (!sessionId) return <p>Sessão inválida.</p>

    return (
        <div className="app">
            {screen === "join" && <ScanScreen onJoin={join} onStart={start} />}
            {screen === "timer" && <TimerScreen elapsedMs={elapsedMs} onFinish={finish} />}
            {screen === "result" && <RankingScreen ranking={ranking} playerName={playerName} />}
        </div>
    );
}