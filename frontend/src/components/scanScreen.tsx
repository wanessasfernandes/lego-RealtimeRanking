import { useState } from "react";
import { CopyrightFooter } from "./footer";
import "./scanScreen.css"

type Props = { onJoin: (name: string) => void; onStart: (name: string) => void };

export function ScanScreen({ onJoin, onStart }: Props) {
  const [name, setName] = useState("");

  return (
    <div className="screen screen-cream">
      <div style={{ fontSize: 30, marginBottom: 6 }}>👋</div>
      <h2>Bem-vindo(a)!</h2>
      <p>Digite seu nome para entrar no ranking</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" maxLength={20} />
      <button
        disabled={name.trim().length === 0}
        onClick={() => {
          onJoin(name.trim());
          onStart(name.trim());
        }}
      >
        Iniciar cronômetro ▶
      </button>
      <CopyrightFooter variant="dark" />
    </div>
  );
}