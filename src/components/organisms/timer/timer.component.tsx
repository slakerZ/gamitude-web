import React, { ReactElement, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
// Local
import { TimerPropTypes } from "./types";
import useTimerStyles from "./styles";
import { selectSelectedProject } from "../../../redux/projects/projects.selectors";
import {
    selectSelectedTimer,
    selectTimers,
} from "../../../redux/timers/timers.selectors";
import { setSelectedTimer } from "redux/timers/timers.actions";

const Timer = ({
    selectedProject,
    selectedTimer,
    setSelectedTimer,
    timers,
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    const leftPad = (val: number) => (val < 10 ? `0${val}` : `${val}`);

    const handleOvertime = () => {
        console.log("added 5");
    };

    const handleSession = () => {
        console.log("started");
    };

    useEffect(() => {
        const defaultTimer = timers.find(
            (timer: any) => timer.id === selectedProject.defaultTimerId,
        );
        if (defaultTimer) {
            setSelectedTimer(defaultTimer);
        }
    }, [selectedProject]);

    return (
        <Fragment>
            <div className={classes.root}>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <ToggleAbleTooltip target="add5">
                            <Button
                                variant="text"
                                onClick={handleOvertime}
                                className={classes.addFive}
                            >
                                <Typography variant="h4" component="h4">
                                    +{selectedTimer.overTime}
                                </Typography>
                            </Button>
                        </ToggleAbleTooltip>
                    }
                >
                    <ToggleAbleTooltip target="sessionTimer">
                        <Button
                            className={classes.timerButton}
                            variant="text"
                            onClick={handleSession}
                        >
                            <div className={classes.timerDisplay}>
                                <div className={classes.minSecWrapper}>
                                    <Typography
                                        display="inline"
                                        variant="h2"
                                        component="h2"
                                    >
                                        {leftPad(selectedTimer.workTime)}
                                    </Typography>
                                    <Typography
                                        display="inline"
                                        variant="h3"
                                        component="h3"
                                    >
                                        {":"}
                                    </Typography>
                                    <Typography
                                        display="inline"
                                        variant="h3"
                                        component="h3"
                                    >
                                        {leftPad(0)}
                                    </Typography>
                                </div>
                            </div>
                        </Button>
                    </ToggleAbleTooltip>
                </Badge>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    selectedProject: selectSelectedProject(state),
    selectedTimer: selectSelectedTimer(state),
    timers: selectTimers(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedTimer: (value: any) => dispatch(setSelectedTimer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
