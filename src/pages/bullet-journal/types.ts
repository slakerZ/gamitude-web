import { JournalType } from "api/bulletJournal/types";
import { PageType } from "api/bulletPages/types";
import { ProjectTaskType } from "api/projectTasks/types";

export interface BulletProps {
    token: string;
    journals: JournalType[];
    pages: PageType[];
    projectTasks: ProjectTaskType[];
    setJournals: any;
    setPages: any;
    setProjectTasks: any;
}
