export interface ProjectTaskType {
    id: string;
    userId: string;
    name: string;
    journalId: string;
    deadline: Date;
    tags: any;
    dateCreated: string;
}

export interface ProjectTaskResponseBodyType {
    data: ProjectTaskType;
    success: boolean;
}

export interface ProjectTaskRequestBodyType {
    journalId: string;
    name: string;
    deadline: Date;
    tags: any;
    description: string;
    note: string;
}
