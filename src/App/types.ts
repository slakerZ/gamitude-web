export interface AppType {
    token: string;
    setUser: (props: SetUserProps) => null;
    tooltipToggle: boolean;
    setTooltipToggle: (props: SetTooltipToggleProps) => null;
    sessionType: string;
    setSessionType: any;
    dateExpires: any;
    isBreak: boolean;
    sessionInProgress: boolean;
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
