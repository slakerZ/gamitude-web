import { ProjectTaskType } from "api/projectTasks/types";

import { ProjectType } from "pages/projects-desktop/types";

export interface ProjectTaskTilePropTypes {
    projects: ProjectType[];
    token: any;
    getProjectTasksList: any;
    currJournalId: string;
    currPageId: string;
    projectTask: ProjectTaskType;
    getProjectsList: any;
}
