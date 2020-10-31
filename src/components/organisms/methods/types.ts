import { SessionMethodType } from "../../../redux/session/types";

export interface MethodsPropType {
    setSessionMethod: (newMethod: SessionMethodType) => null;
}
