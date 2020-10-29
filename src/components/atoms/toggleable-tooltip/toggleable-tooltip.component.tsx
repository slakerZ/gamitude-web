import React from "react";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { ReduxStateType } from "../../../redux/root.reducer";
import { selectTooltipToggle } from "../../../redux/user/user.selectors";
import CustomTooltipText from "../custom-tooltip-text/custom-tooltip-text.component";
import { ToggleAbleTooltipPropType } from "./types";

const ToggleAbleTooltip = ({
    children,
    target,
    tooltipToggle,
}: ToggleAbleTooltipPropType) => {
    return (
        <Tooltip
            title={<CustomTooltipText target={target} />}
            disableFocusListener={!tooltipToggle && target !== "tooltipToggle"}
            disableHoverListener={!tooltipToggle && target !== "tooltipToggle"}
            disableTouchListener={!tooltipToggle && target !== "tooltipToggle"}
        >
            <span>{children}</span>
        </Tooltip>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    tooltipToggle: selectTooltipToggle(state),
});

export default connect(mapStateToProps)(ToggleAbleTooltip);
