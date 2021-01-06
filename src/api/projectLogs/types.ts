import { ProjectSessionType } from "configs/types";

import { ProjectType } from "pages/projects-desktop/types";

interface ProjectInLogType extends ProjectType {
    userId: string;
}

interface ProjectLogType {
    id: string;
    project: ProjectInLogType;
    projectTask: any;
    userId: string;
    log: string;
    timeSpend: number;
    dateCreated: string;
    type: ProjectSessionType;
}

export interface ProjectLogRequestBodyType {
    projectId: string;
    projectTaskId: string | null;
    log: string;
    timeSpend: number;
    type: ProjectSessionType;
}

export interface ProjectLogResponseBodyType {
    data: ProjectLogType[] | ProjectLogType;
    success: boolean;
}
