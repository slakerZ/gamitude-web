import { FolderType } from "api/folders/types";

export interface ProjectsPropTypes {
    projects: any;
    setFolders: any;
    setProjects: any;
    token: string;
    folders: FolderType[];
    setUser: any;
    sessionInProgress: any;
    isBreak: boolean;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
