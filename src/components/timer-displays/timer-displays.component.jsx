import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";

const TimerDisplays = ({ time }) => {
    const useStyles = makeStyles({
        timerDisplays: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
        },
        hours: {
            fontSize: "4rem",
        },
        minutes: {
            fontSize: "3rem",
        },
        seconds: {
            fontSize: "2rem",
        },
    });
    const classes = useStyles();

    const leftPad = val => (val < 10 ? `0${val}` : `${val}`);
    let minutes = 0;
    let seconds = 0;
    if (time) {
        minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((time % (1000 * 60)) / 1000);
    }

    // Zmiana time.get na swoje
    return (
        <div className={classes.timerDisplays}>
            <div className={classes.minutes}>
                {leftPad(minutes > 1000 ? Math.floor(minutes / 1000) : minutes)}
                :
            </div>
            <div className={classes.seconds}>{leftPad(seconds)}</div>
        </div>
    );
};
export default TimerDisplays;
