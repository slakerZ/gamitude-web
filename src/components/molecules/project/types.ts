import { TimerType } from "api/timers/types";

export interface ProjectType {
    index: number;
    setNameRedux: any;
    projects: any;
    setBoostedRedux: any;
    setDominantRedux: any;
    deleteProject: any;
    token: any;
    setSelectedProject: any;
    setStatusRedux: any;
    setFolderRedux: any;
    methods: TimerType[];
    folders: any;
}
