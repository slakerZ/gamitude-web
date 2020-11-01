import { FolderType } from "../../redux/folders/types";

export interface ProjectsType {
    projects: any;
    setProjects: any;
    token: string;
    addProject: any;
    folders: FolderType[];
    addFolder: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
