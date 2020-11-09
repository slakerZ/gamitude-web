import { ProjectSessionType } from "types";

export interface SessionType {
    sessionInProgress: boolean;
    sessionsComplete: number;
    sessionType: ProjectSessionType;
}
