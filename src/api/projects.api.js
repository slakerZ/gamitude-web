export const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:5010/api/pro/Projects"
        : "gamitude.rocks/api/pro/Projects";
export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
    },
});

export const parseProjects = projects => {
    return projects.map(project => ({
        id: project.id,
        name: project.name,
        method: mapPrimaryMethodToMethod(project.primaryMethod),
        status: mapProjectStatusToStatus(project.projectStatus),
        boosted: mapStatsToBoosted(project.stats),
        dominant: mapDominantStatToDominant(project.dominantStat),
    }));
};

const mapPrimaryMethodToMethod = primaryMethod => {
    switch (primaryMethod) {
        case "POMODORO":
            return 25;
        case "NINETY":
            return 90;
        default:
            return 25;
    }
};

const mapProjectStatusToStatus = projectStatus => {
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

const mapStatsToBoosted = stats => {
    return stats.map(stat => {
        return stat.toLowerCase();
    });
};

const mapDominantStatToDominant = dominantStat => {
    return dominantStat.toLowerCase();
};
