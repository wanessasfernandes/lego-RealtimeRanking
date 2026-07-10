import "./timerScreen.css"
import { CopyrightFooter } from "./footer";

type Props = { elapsedMs: number; onFinish: () => void };

function formatTime(ms: number): string {
    const total = ms / 1000; 
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = Math.floor(total % 60).toString().padStart(2, "0");
    const d = Math.floor((total * 10) % 10);
    return `${m}:${s}.${d}`;
}

export function TimerScreen({ elapsedMs, onFinish }: Props) {
    return (
        <div className="screen screen-navy">
            <div className="bricks">
                <div className="brick"></div><div className="brick"></div> 
                <div className="brick"></div><div className="brick"></div> 
            </div>
            <p>Monte o Lego o mais rápido possível!</p>
            <div className="timer-display">{formatTime(elapsedMs)}</div>
            <button onClick={onFinish}>FINALIZAR ✔</button>
            <CopyrightFooter variant="light" /> 
        </div>
    );
}