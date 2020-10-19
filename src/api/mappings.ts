// From front to API
export const mapMethodToPrimaryMethod = (method: number): string => {
    switch (method) {
        case 25:
            return "POMODORO";
        case 90:
            return "NINETY";
        default:
            return "POMODORO";
    }
};
export const mapBoostedToStats = (boosted: string[]): string[] => {
    return boosted.map((stat: string) => {
        return stat.toUpperCase();
    });
};

export const mapDominantToDominantStat = (dominant: string): string => {
    return dominant.toUpperCase();
};

// From API to front
export const mapPrimaryMethodToMethod = (primaryMethod: string): number => {
    switch (primaryMethod) {
        case "POMODORO":
            return 25;
        case "NINETY":
            return 90;
        default:
            return 25;
    }
};

export const mapProjectStatusToStatus = (projectStatus: string): number => {
    switch (projectStatus) {
        case "ACTIVE":
            return 0;
        case "ONHOLD":
            return 1;
        case "DONE":
            return 2;
        default:
            return 0;
    }
};

export const mapStatsToBoosted = (stats: string[]): string[] => {
    return stats.map((stat) => {
        return stat.toLowerCase();
    });
};

export const mapDominantStatToDominant = (dominantStat: string): string => {
    return dominantStat.toLowerCase();
};

export const parseProjects = (projects: any[]) => {
    return projects.map((project) => ({
        id: project.id,
        name: project.name,
        method: mapPrimaryMethodToMethod(project.primaryMethod),
        status: mapProjectStatusToStatus(project.projectStatus),
        boosted: mapStatsToBoosted(project.stats),
        dominant: mapDominantStatToDominant(project.dominantStat),
    }));
};

export const convertForFront = (responseData: {
    id: number;
    name: string;
    stats: string[];
    dominantStat: string;
}) => ({
    id: responseData.id,
    name: responseData.name,
    method: 25,
    status: 0,
    boosted: mapStatsToBoosted(responseData.stats),
    dominant: mapDominantStatToDominant(responseData.dominantStat),
});
