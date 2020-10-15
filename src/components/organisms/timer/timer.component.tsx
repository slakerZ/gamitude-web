import React, { FC, ReactElement, Fragment, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Local
import { TimerType } from "./types";
import useTimerStyles from "./styles";

const Timer: FC = (): ReactElement => {
    const classes = useTimerStyles();

    // TODO: add support for unlimited custom - pagination
    const [method, setMethod] = useState(25);

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
                        <Button
                            variant="text"
                            onClick={handleOvertime}
                            className={classes.addFive}
                        >
                            <Typography variant="h4" component="h4">
                                {"+5"}
                            </Typography>
                        </Button>
                    }
                >
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
                                    {leftPad(method)}
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
                    </Button>
                </Badge>
            </div>
        </Fragment>
    );
};

export default Timer;
