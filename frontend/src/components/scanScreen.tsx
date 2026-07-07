import { useState } from "react";

type Props = { onJoin: (name: string) => void; onStart: () => void };

export function ScanScreen({ onJoin, onStart }: Props) {
    const [name, setName] = useState(""); 

    return (
        <div className="screen screen-cream">
            <h2>Bem-vindo(a)!</h2>
            <p>Digite seu nome para entrar no ranking</p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" maxLength={20} />
            <button
                disabled={name.trim().length === 0}
                onClick={() => {
                    onJoin(name.trim());
                    onStart();
                }}
            >
                Iniciar cronômetro ▶
            </button>
        </div>
    );
}