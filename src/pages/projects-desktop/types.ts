import { FolderType } from "api/folders/types";

export interface ProjectsPropTypes {
    projects: any;
    setFolders: any;
    setProjects: any;
    token: string;
    addProject: any;
    folders: FolderType[];
    addFolder: (value: FolderType) => null;
    methods: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
