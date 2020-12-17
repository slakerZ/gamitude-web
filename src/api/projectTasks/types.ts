export interface ProjectTaskType {
    id: string;
    userId: string;
    name: string;
    journalId: string;
    deadline: string;
    tags: string[];
    dateCreated: string;
}

export interface ProjectTaskResponseBodyType {
    data: ProjectTaskType;
    success: boolean;
}

export interface ProjectTaskRequestBodyType {
    journalId: string;
    name: string;
    deadline: string;
    tags: string[];
    description: string;
    note: string;
}
