export interface JournalType {
    id: string;
    userId: string;
    name: string;
    projectId: string;
    description: string;
    icon: string;
    dateCreated: string;
}

export interface JournalResponseBodyType {
    data: JournalType;
    success: boolean;
}

export interface JournalRequestBodyType {
    projectId: string | null;
    name: string;
    icon: string;
    description: string;
}
