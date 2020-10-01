export interface AppType {
    token: string;
    setUser: (props: SetUserProps) => null;
    tooltipToggle: boolean;
    setTooltipToggle: (props: SetTooltipToggleProps) => null;
}
export interface LinkType {
    to: string;
    label: string;
    icon: string;
}

interface SetUserProps {
    token: string | null;
}

interface SetTooltipToggleProps {
    tooltipToggle: boolean;
}