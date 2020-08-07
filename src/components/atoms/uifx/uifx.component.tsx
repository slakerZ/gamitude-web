import React, { useEffect } from "react";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const Uifx = ({
    sessionEndSound,
    minuteLeftSound,
    sessionTime,
}: {
    sessionEndSound: any;
    minuteLeftSound: any;
    sessionTime: any;
}) => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            top: 0,
            left: 0,
        },
    });
    const classes = useStyles();

    useEffect(() => {
        if (sessionTime.asSeconds() === 60) {
            minuteLeftSound.play();
        }
    }, [sessionTime, minuteLeftSound]);

    useEffect(() => {
        if (sessionTime.asSeconds() === 0) {
            sessionEndSound.play();
        }
    }, [sessionTime, sessionEndSound]);

    return <div className={classes.root}></div>;
};

const mapStateToProps = (state: any) => ({
    sessionEndSound: state.uifx.projectSounds.sessionEndSound,
    minuteLeftSound: state.uifx.projectSounds.minuteLeftSound,
});

export default connect(mapStateToProps)(Uifx);
