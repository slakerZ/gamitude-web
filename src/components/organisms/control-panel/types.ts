interface SetUserProps {
    token: string | null;
}

interface SetTooltipToggleProps {
    tooltipToggle: boolean;
}

export interface ControlPanelType {
    setUser: (props: SetUserProps) => null;
    tooltipToggle: boolean;
    setTooltipToggle: (props: SetTooltipToggleProps) => null;
}
