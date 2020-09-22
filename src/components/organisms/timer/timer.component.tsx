import React, { FC, ReactElement, Fragment, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Local
import { TimerType } from "./types";
import useTimerStyles from "./styles";

const Timer: FC = (): ReactElement => {
    const classes = useTimerStyles();

    // TODO: add support for unlimited custom - pagination
    const [method, setMethod] = useState("25");
    const methods = [
        { label: "5", name: "Just 5", minutes: 5 },
        { label: "25", name: "Pomodoro", minutes: 25 },
        { label: "90", name: "Ultradian Rythm", minutes: 90 },
        { label: "\u221E", name: "Stopwatch", minutes: 0 },
        { label: "18", name: "Custom 1", minutes: 18 },
    ];

    const leftPad = (val: number) => (val < 10 ? `0${val}` : `${val}`);

    const handleMethodChange = (
        event: React.MouseEvent<HTMLElement>,
        newMethod: string,
    ) => {
        setMethod(newMethod);
    };

    const handlePrevious = () => {
        const currIndex = methods.findIndex((m) => m.label === method);
        if (currIndex > 0) {
            setMethod(methods[currIndex - 1].label);
        }
    };

    const handleNext = () => {
        const currIndex = methods.findIndex((m) => m.label === method);
        if (currIndex + 1 < methods.length) {
            setMethod(methods[currIndex + 1].label);
        }
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
                        <div className={classes.addFive}>
                            <Typography variant="h4" component="h4">
                                {"+5"}
                            </Typography>
                        </div>
                    }
                >
                    <div className={classes.timerDisplay}>
                        <div className={classes.minSecWrapper}>
                            <Typography
                                display="inline"
                                variant="h2"
                                component="h2"
                            >
                                {leftPad(25)}
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
                                {leftPad(4)}
                            </Typography>
                        </div>
                    </div>
                </Badge>

                <div className={classes.methods}>
                    <IconButton
                        aria-label="previous method"
                        onClick={handlePrevious}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <ToggleButtonGroup
                        value={method}
                        exclusive
                        onChange={handleMethodChange}
                        aria-label="Current method"
                    >
                        {methods.map((method, index) => {
                            return (
                                <ToggleButton
                                    key={index}
                                    value={method.label}
                                    className={classes.methodButton}
                                >
                                    <Typography
                                        display="inline"
                                        className={classes.method}
                                        variant="body1"
                                    >
                                        {method.label}
                                    </Typography>
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
                    <IconButton
                        aria-label="previous method"
                        onClick={handleNext}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </div>
            </div>
        </Fragment>
    );
};

export default Timer;
