import { JournalType } from "api/bulletJournal/types";
import { PageType } from "api/bulletPages/types";

export interface BulletPropTypes {
    setJournals: any;
    token: string;
    journals: JournalType[];
    pages: PageType[];
    setPages: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
