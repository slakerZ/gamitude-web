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
        if (time / 60 > 1000) {
            minutes = time / 1000;
        }

        if (time > 59) {
            minutes = Math.floor(time / 60);
            seconds = time % 60;
        }
    }

    // Zmiana time.get na swoje
    return (
        <div className={classes.timerDisplays}>
            <div className={classes.minutes}>
                {leftPad(minutes > 1000 ? minutes / 1000 : minutes)}:
            </div>
            <div className={classes.seconds}>{leftPad(seconds)}</div>
        </div>
    );
};
export default TimerDisplays;
