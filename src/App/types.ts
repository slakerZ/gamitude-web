import { ProjectSessionType } from "types";

export interface AppType {
    token: string;
    setUser: (props: SetUserProps) => null;
    tooltipToggle: boolean;
    setTooltipToggle: (props: SetTooltipToggleProps) => null;
    sessionType: ProjectSessionType;
    setSessionType: (props: any) => null;
}
export interface LinkType {
    to: string;
    label: string;
    icon: string;
    tooltip: string;
}

interface SetUserProps {
    token: string | null;
}

interface SetTooltipToggleProps {
    tooltipToggle: boolean;
}
