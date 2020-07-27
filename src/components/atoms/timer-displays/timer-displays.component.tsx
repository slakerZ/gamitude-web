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

    const leftPad = (val) => (val < 10 ? `0${val}` : `${val}`);

    return (
        <div className={classes.timerDisplays}>
            <div className={classes.hours}>{leftPad(time.get("hours"))}:</div>
            <div className={classes.minutes}>
                {leftPad(time.get("minutes"))}:
            </div>
            <div className={classes.seconds}>
                {leftPad(time.get("seconds"))}
            </div>
        </div>
    );
};
export default TimerDisplays;
