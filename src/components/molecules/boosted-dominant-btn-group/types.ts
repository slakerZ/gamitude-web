import { FolderType } from "../../../redux/folders/types";
import { MethodType } from "../../../redux/methods/types";

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
    methods: MethodType[];
    method: any;
    setMethod: any;
}
