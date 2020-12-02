export interface PageType {
    id: string;
    userId: string;
    name: string;
    journalId: string;
    fromDay: number;
    toDay: number;
    icon: string;
    dateCreated: string;
}

export interface PageResponseBodyType {
    data: PageType;
    success: boolean;
}

export interface PageRequestBodyType {
    journalId: string;
    name: string;
    icon: string;
    fromDay: number;
    toDay: number;
}
