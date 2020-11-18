export interface StatsType {
    strength: number;
    creativity: number;
    intelligence: number;
    fluency: number;
}

export interface EnergiesType {
    body: number;
    emotions: number;
    mind: number;
    soul: number;
}

export interface StatisticsStatsResponseBodyType {
    data: StatsType;
    success: boolean;
}

export interface StatisticsEnergiessResponseBodyType {
    data: EnergiesType;
    success: boolean;
}
