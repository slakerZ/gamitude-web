import { ProjectTaskType } from "api/projectTasks/types";

import { ProjectType } from "pages/projects-desktop/types";

export interface ProjectTaskPropTypes {
    projects: ProjectType[];
    token: any;
    setProjects: any;
    getProjectTasksList: any;
    currJournalId: string;
    currPageId: string;
    tasksCurrPageIndex: number;
    projectTask: ProjectTaskType;
    handleOpenNewProjectTaskDialog: () => void;
}
