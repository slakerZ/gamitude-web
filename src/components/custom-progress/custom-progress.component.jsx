import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const CustomProgress = ({ stat }) => {
    const useStyles = makeStyles(theme => ({
        progress: {
            borderRadius: "20px",
            height: "100%",
            backgroundPosition: "center",
            backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            transition: "width 1.2s",
            transitionTimingFunction: "linear",
            width: `${stat}%`,
        },
    }));
    const classes = useStyles();

    return <div className={classes.progress} />;
};

export default CustomProgress;
