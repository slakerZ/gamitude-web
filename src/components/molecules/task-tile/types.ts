import { ProjectTaskType } from "api/projectTasks/types";
import { ProjectType } from "api/projects/types";

export interface ProjectTaskTilePropTypes {
    projects: ProjectType[];
    token: any;
    getProjectTasksList: any;
    currJournalId: string;
    currPageId: string;
    projectTask: ProjectTaskType;
    getProjectsList: any;
    setSelectedTask: any;
    setSelectedProject: any;
    sessionInProgress: any;
    isBreak: any;
    setSnackbarState: any;
    getProjectsListState: any;
}
