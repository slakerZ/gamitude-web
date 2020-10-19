export interface LogTimeValuesType {
    id: number;
    totalTime: number;
    boosted: string[];
    dominant: string;
}

export interface LogTimeHeadersType {
    headers: {
        Authorization: string;
    };
}

export interface LogTimeRequestBodyType {
    ProjectId: number;
    ProjectType: string;
    Duration: number;
    Stats: string[];
    DominantStat: string;
}

export interface GetRankType {
    name: string;
    tier: string;
    imageUrl: string;
    rankFortes: string[];
}

export interface GetStatsType {
    strength: number;
    creativity: number;
    intelligence: number;
    fluency: number;
}

export interface GetEnergiesType {
    body: number;
    emotions: number;
    mind: number;
    soul: number;
}
