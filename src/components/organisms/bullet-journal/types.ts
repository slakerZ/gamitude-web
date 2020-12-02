import { JournalType } from "api/bulletJournal/types";

export interface BulletPropTypes {
    setJournals: any;
    token: string;
    journals: JournalType[];
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
