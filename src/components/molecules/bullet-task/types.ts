import { ProjectTaskType } from "api/projectTasks/types";
import { ProjectType } from "api/projects/types";

export interface ProjectTaskPropTypes {
    projects: ProjectType[];
    token: any;
    setProjects: any;
    getProjectTasksList: any;
    currJournalId: string;
    currPageId: string;
    tasksCurrPageIndex: string | boolean;
    projectTask: ProjectTaskType;
    setSelectedProjectTask: any;
    selectedProjectTask: string;
    isBreak: any;
    sessionInProgress: any;
}
