import { ProjectTaskType } from "api/projectTasks/types";

export interface BulletProps {
    token: string;
    projectTasks: ProjectTaskType[];
    setJournals: any;
    setPages: any;
    setProjectTasks: any;
    setProjects: any;
}
