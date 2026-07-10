import { RankingScreen } from "../components/rankingScreen";
import { ScanScreen } from "../components/scanScreen";
import { TimerScreen } from "../components/timerScreen";

const mockRanking = [   
    { position: 1, name: "Turma A - Equipe Foguete", elapsed_ms: 38200 },
    { position: 2, name: "Você", elapsed_ms: 44700 },
    { position: 3, name: "Turma C - Equipe Girassol", elapsed_ms: 62800 }
];

export function StyleGuidePage() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", padding: "24px", background: "#eee" }}>
            <div>
                <p style={{ fontFamily: "monospace", marginBottom: 8 }}>ScanScreen</p>
                <div className="app" style={{ minHeight: "auto", height: 560 }}>
                    <ScanScreen onJoin={() => {}} onStart={() => {}} />
                </div>
            </div>

            <div>
                <p style={{ fontFamily: "monospace", marginBottom: 8 }}>TimerScreen</p>
                <div className="app" style={{ minHeight: "auto", height: 560 }}>
                    <TimerScreen elapsedMs={12345} onFinish={() => {}} />
                </div>
            </div>

            <div>
                <p style={{ fontFamily: "monospace", marginBottom: 8 }}>RankingScreen</p>
                <div className="app" style={{ minHeight: "auto", height: 560 }}>
                    <RankingScreen ranking={mockRanking} playerName="Você" />
                </div>
            </div>
        </div>
    );
}