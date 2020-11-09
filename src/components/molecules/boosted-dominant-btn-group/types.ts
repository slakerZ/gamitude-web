import { FolderType } from "api/folders/types";
import { TimerType } from "api/timers/types";

export interface BoostedDominantBtnGroupPropTypes {
    boosted: any[];
    dominant: any;
    setBoosted: any;
    setDominant: any;
    name: any;
    setName: any;
    sessionType: any;
    setSessionType: any;
    folders: FolderType[];
    folder: any;
    setFolder: any;
    methods: TimerType[];
    method: any;
    setMethod: any;
}
