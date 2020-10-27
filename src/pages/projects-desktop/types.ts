export interface ProjectsType {
    projects: any;
    setProjects: any;
    token: string;
    addProject: any;
    selectedProject: any;
    setSelectedProject: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
