import React, { ReactElement, Fragment, useState } from "react";
import { connect } from "react-redux";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { selectSelectedMethod } from "../../../redux/methods/methods.selectors";
import { selectSelectedProject } from "../../../redux/projects/projects.selectors";

import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";

import { TimerPropTypes } from "./types";

import useTimerStyles from "./styles";

const Timer = ({
    selectedProject,
    selectedMethod,
}: TimerPropTypes): ReactElement => {
    const classes = useTimerStyles();

    // TODO: add support for unlimited custom - pagination
    const [method, setMethod] = useState(selectedMethod.minutes);

    const leftPad = (val: number) => (val < 10 ? `0${val}` : `${val}`);

    const handleOvertime = () => {
        console.log("added 5");
    };

    const handleSession = () => {
        console.log("started");
    };

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
                                    {"+5"}
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
                                        {leftPad(selectedMethod.minutes)}
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
    selectedMethod: selectSelectedMethod(state),
});

export default connect(mapStateToProps)(Timer);
