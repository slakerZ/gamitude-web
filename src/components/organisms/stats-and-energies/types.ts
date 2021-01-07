interface Energies {
    body: number;
    emotions: number;
    mind: number;
    soul: number;
}

interface Stats {
    strength: number;
    creativity: number;
    intelligence: number;
    fluency: number;
}

export interface StatsAndEnergiesType {
    energies: Energies;
    setEnergies: (newEnergies: Energies) => void;
    stats: Stats;
    setStats: (newStats: Stats) => void;
    token: string;
    sessionsComplete: number;
    user: boolean | null;
}
