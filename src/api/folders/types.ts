export interface FolderType {
    id: string;
    userId: string;
    name: string;
    description: string;
    icon: string;
    dateCreated: string;
}

export interface FolderResponseBodyType {
    data: FolderType;
    success: boolean;
}

export interface FolderRequestBodyType {
    name?: string;
    description?: string;
    icon?: string;
}
