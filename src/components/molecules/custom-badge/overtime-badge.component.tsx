import { TimerTypes } from "configs/constants";

import React, { Fragment } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { selectSelectedTimer } from "redux/timers/timers.selectors";

import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useCustomBadgeStyles from "./styles";
import { OvertimeBadgePropTypes } from "./types";

const OvertimeBadge = ({
    children,
    handleOvertime,
    selectedProject,
    sessionInProgress,
    selectedTimer,
    isBreak,
}: OvertimeBadgePropTypes) => {
    const classes = useCustomBadgeStyles();

    return selectedTimer &&
        selectedTimer.timerType === TimerTypes.TIMER &&
        !isBreak ? (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="overtime" placement="left-end">
                    <Button
                        aria-label="Overtime button"
                        variant="text"
                        onClick={handleOvertime}
                        className={classes.badgeButton}
                        disabled={!selectedProject.id || !sessionInProgress}
                    >
                        <Typography variant="h4" component="h4">
                            +
                            {selectedTimer
                                ? selectedTimer.countDownInfo.overTime
                                : 0}
                        </Typography>
                    </Button>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    ) : (
        <Fragment>{children}</Fragment>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    selectedProject: selectSelectedProject(state),
    sessionInProgress: selectSessionInProgress(state),
    isBreak: selectIsBreak(state),
    selectedTimer: selectSelectedTimer(state),
});

export default connect(mapStateToProps)(OvertimeBadge);
