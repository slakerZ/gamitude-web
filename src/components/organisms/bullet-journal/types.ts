import { JournalType } from "api/bulletJournal/types";
import { PageType } from "api/bulletPages/types";
import { ProjectTaskType } from "api/projectTasks/types";

export interface BulletPropTypes {
    setJournals: any;
    token: string;
    journals: JournalType[];
    pages: PageType[];
    setPages: any;
    setProjectTasks: any;
}

export interface ProjectType {
    id: number;
    name: string;
    primaryMethod: string;
    projectFolder: number;
    dominantStat: string;
    stats: string[];
}
