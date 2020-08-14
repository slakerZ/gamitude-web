interface Energies {
    body: number;
    emotions: number;
    mind: number;
    soul: number;
}

export interface StatsAndEnergiesType {
    energies: Energies;
    token: string;
    setEnergies: (newEnergies: Energies) => void;
    sessionsComplete: number;
}
