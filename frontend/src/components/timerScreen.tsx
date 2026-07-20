import "./timerScreen.css"
import { CopyrightFooter } from "./footer";

type Props = { 
    elapsedMs: number; 
    onFinish?: () => void; 
    playerName?: string;
    };

export function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000); 
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    const d = Math.floor((ms / 100) % 10);
    return `${m}:${s}.${d}`;
}

export function TimerScreen({ elapsedMs, onFinish, playerName }: Props) {
    const isCountingDown = elapsedMs < 0;
    const countdownNumber = Math.max(1, Math.ceil(-elapsedMs / 1000));

    return (
        <div className="screen screen-navy">
            <div className="bricks">
                <div className="brick"></div><div className="brick"></div> 
                <div className="brick"></div><div className="brick"></div> 
            </div>

            {isCountingDown ? (
                <>
                    <p>Prepare-se!</p>
                    <div className="countdown-display">{countdownNumber}</div>
                </>
            ) : (
                <>
                    <p>{playerName ? `${playerName} está montando!` : "Monte o Lego o mais rápido possível!"}</p>
                    <div className="timer-display">{formatTime(elapsedMs)}</div>
                </>
            )}
            {onFinish && (
                <button onClick={onFinish}>FINALIZAR ✔</button>   
            )}
            <CopyrightFooter variant="light" /> 
        </div>
    );
}