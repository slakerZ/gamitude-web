import React from "react";
import "./timer-displays.styles.scss";

const TimerDisplays = ({ time }) => {
    const leftPad = val => (val < 10 ? `0${val}` : `${val}`);
    return (
        <div className="timer-displays">
            <div className="hours">{leftPad(time.get("hours"))}:</div>
            <div className="minutes">{leftPad(time.get("minutes"))}:</div>
            <div className="seconds">{leftPad(time.get("seconds"))}</div>
        </div>
    );
};
export default TimerDisplays;
