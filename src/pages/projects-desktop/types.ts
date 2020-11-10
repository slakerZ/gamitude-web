import { FolderType } from "api/folders/types";

export interface ProjectsPropTypes {
    projects: any;
    setFolders: any;
    setProjects: any;
    token: string;
    folders: FolderType[];
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}

export interface NewProjectDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getProjectsList: any;
}
export interface NewFolderDialogPropTypes {
    token: string;
    open: boolean;
    setOpen: any;
    getFoldersList: any;
}
