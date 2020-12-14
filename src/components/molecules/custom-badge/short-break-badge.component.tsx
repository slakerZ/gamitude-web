import { TimerTypes } from "configs/constants";

import React, { Fragment } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { ReduxStateType } from "redux/root.reducer";
import { selectSelectedTimer } from "redux/timers/timers.selectors";

import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useCustomBadgeStyles from "./styles";
import { DisplayBadgePropTypes } from "./types";

const ShortBreakBadge = ({
    children,
    selectedTimer,
}: DisplayBadgePropTypes) => {
    const classes = useCustomBadgeStyles();

    return selectedTimer && selectedTimer.timerType === TimerTypes.TIMER ? (
        <Badge
            aria-label="Short break time display"
            overlap="circle"
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="shortBreak" placement="left">
                    <Button
                        aria-label="Short break time display / skip break"
                        variant="text"
                        className={classes.badgeButton}
                        disabled={true}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer
                                ? selectedTimer.countDownInfo.breakTime
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
    selectedTimer: selectSelectedTimer(state),
});

export default connect(mapStateToProps)(ShortBreakBadge);
