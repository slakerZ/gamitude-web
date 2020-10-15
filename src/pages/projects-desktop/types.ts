export interface ProjectsType {
    projects: any;
    projectsTab: any;
    setProjects: any;
    token: string;
    addProject: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
