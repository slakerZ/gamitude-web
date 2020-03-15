import React from "react";
import Particles from "react-particles-js";
// Config
import particleOptions from "./particlesjs-config.json";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const CustomParticles = () => {
    const useStyles = makeStyles(theme => ({
        particles: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            backgroundImage: `radial-gradient(circle,${theme.palette.secondary.lighter},${theme.palette.secondary.main},${theme.palette.secondary.dark})`,
        },
    }));
    const classes = useStyles();

    return <Particles params={particleOptions} className={classes.particles} />;
};

export default CustomParticles;
