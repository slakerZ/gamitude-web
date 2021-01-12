export interface ProjectTaskType {
    id: string;
    userId: string;
    name: string;
    journalId: string;
    deadline: string | null;
    tags: string[];
    dateCreated: string;
    note: string;
    projectId: string | null;
}

export interface ProjectTaskResponseBodyType {
    data: ProjectTaskType;
    success: boolean;
}

export interface ProjectTaskRequestBodyType {
    journalId: string;
    name: string;
    deadline: string | null;
    tags: string[];
    description: string;
    note: string;
    projectId: string | null;
}
