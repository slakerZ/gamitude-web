export interface PageType {
    id: string;
    userId: string;
    name: string;
    journalId: string;
    beetwenDays: { fromDay: number; toDay: number } | null;
    icon: string;
    pageType: string;
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
    beetwenDays: { fromDay: number; toDay: number } | null;
    pageType: string;
}
