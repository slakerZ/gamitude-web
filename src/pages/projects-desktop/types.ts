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
    setAddProjectDialogOpen: any;
    isAddProjectDialogOpen: boolean;
    setFoldersSettingsDialogOpen: any;
    isFolderSettingsDialogOpen: boolean;
}
