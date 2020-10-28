import React, { useEffect } from "react";
import { connect } from "react-redux";
import useSound from "use-sound";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const Uifx = ({ sessionEndSound, minuteLeftSound, sessionTime }) => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            top: 0,
            left: 0,
        },
    });
    const classes = useStyles();

    const [playMin] = useSound(minuteLeftSound, {
        volume: 0.2,
        interrupt: true,
    });

    const [play, { stop }] = useSound(sessionEndSound, {
        volume: 0.2,
        interrupt: true,
        onend: () => {
            stop();
        },
    });
    //asSeconds wyjebać
    useEffect(() => {
        if (sessionTime >= 60000 && sessionTime < 61000) {
            playMin();
        }
    }, [sessionTime]);

    useEffect(() => {
        if (sessionTime <= 0) {
            play();
        }
    }, [sessionTime]);

    return <div className={classes.root}></div>;
};

const mapStateToProps = state => ({
    sessionEndSound: state.uifx.projectSounds.sessionEndSound,
    minuteLeftSound: state.uifx.projectSounds.minuteLeftSound,
});

export default connect(mapStateToProps)(Uifx);
