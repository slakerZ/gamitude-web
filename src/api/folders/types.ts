export interface FolderResponseBodyType {
    data: {
        id: string;
        userId: string;
        name: string;
        description: string;
        icon: string;
        dateCreated: string;
    };
    success: boolean;
}

export interface FolderRequestBodyType {
    name?: string;
    description?: string;
    icon?: string;
}
