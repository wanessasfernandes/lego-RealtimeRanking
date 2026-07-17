import "./timerScreen.css"
import { CopyrightFooter } from "./footer";

type Props = { elapsedMs: number; onFinish: () => void };

export function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000); 
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    const d = Math.floor((ms / 100) % 10);
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