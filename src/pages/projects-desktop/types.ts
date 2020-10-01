export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    currFolder: number;
}

export interface ProjectsType {
    projects: any;
    projectsTab: any;
    setProjects: any;
    token: string;
}

export interface a11yType {
    id: string;
    "aria-controls": string;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
