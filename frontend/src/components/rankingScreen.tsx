import type { RankingEntry } from "../types";
import { CopyrightFooter } from "./footer";
import "./rankingScreen.css"

type Props = { ranking: RankingEntry[]; playerName: string };

export function RankingScreen({ ranking, playerName }: Props ) {
    const myPosition = ranking.find((r) => r.name === playerName)?.position;

    return (
        <div className="screen screen-cream">
            <h2>🏆 Ranking do Desafio</h2>
            {myPosition && <p> Você ficou em {myPosition}º lugar!</p>}
            <ul className="rank=list">
                {ranking.map((r) => (
                    <li key={r.position} className={r.name === playerName ? "me" : ""}>
                        <span>{r.position}º</span> <span>{r.name}</span> 
                        <span className="rank-name">{r.name}</span>
                        <span>{(r.elapsed_ms / 1000).toFixed(1)}s</span>
                    </li>
                ))}
            </ul>
            <CopyrightFooter variant="dark" />
        </div>
    );
}