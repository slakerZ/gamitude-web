export interface StatisticsStatsResponseBodyType {
    data: {
        strength: number;
        creativity: number;
        intelligence: number;
        fluency: number;
    };
    success: boolean;
}

export interface StatisticsEnergiessResponseBodyType {
    data: {
        body: number;
        emotions: number;
        mind: number;
        soul: number;
    };
    success: boolean;
}
