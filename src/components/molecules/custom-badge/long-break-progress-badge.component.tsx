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

const LongBreakProgressBadge = ({
    children,
    selectedTimer,
}: DisplayBadgePropTypes) => {
    const classes = useCustomBadgeStyles();

    return selectedTimer && selectedTimer.countDownInfo.longerBreakTime ? (
        <Badge
            aria-label="Progress towards long break"
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            badgeContent={
                <ToggleAbleTooltip target="breakInterval" placement="left">
                    <Button
                        aria-label="Skip break"
                        variant="text"
                        className={classes.badgeButton}
                        disabled={true}
                    >
                        <Typography variant="h4" component="h4">
                            {selectedTimer.countDownInfo.breakInterval}
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

export default connect(mapStateToProps)(LongBreakProgressBadge);
