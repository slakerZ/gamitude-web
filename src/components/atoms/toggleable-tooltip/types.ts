import { TooltipProps } from "@material-ui/core/Tooltip";

export interface ToggleAbleTooltipPropType {
    children: any;
    target: string;
    tooltipToggle: boolean;
    placement?: TooltipProps["placement"];
}
