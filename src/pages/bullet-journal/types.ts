import { JournalType } from "api/bulletJournal/types";
import { PageType } from "api/bulletPages/types";
import { ProjectTaskType } from "api/projectTasks/types";

import { ProjectType } from "pages/projects-desktop/types";

export interface BulletProps {
    token: string;
    journals: JournalType[];
    pages: PageType[];
    projectTasks: ProjectTaskType[];
    setJournals: any;
    setPages: any;
    setProjectTasks: any;
    setProjects: any;
    projects: ProjectType[];
}
