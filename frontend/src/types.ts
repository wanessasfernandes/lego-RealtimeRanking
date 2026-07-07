export type RankingEntry = {
    position: number;
    name: string;
    elapsed_ms: number;
};

export type ServerMessage = 
    | { type: "player_joined"; name: string }
    | { type: "started"; start_timestamp: number; name: string }
    | { type: "tick"; elapsed_ms: number }
    | { type: "finished"; elapsed_ms: number; ranking: RankingEntry[] }

export type Screen = "join" | "timer" | "result"; 