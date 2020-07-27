import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../customTheme";

const CustomProgress = ({ stat, variant }) => {
    const setColor = (variant) => {
        switch (variant) {
            case "body":
            case "strength":
                return theme.palette.stats.strength;
            case "emotions":
            case "creativity":
                return theme.palette.stats.creativity;
            case "mind":
            case "intelligence":
                return theme.palette.stats.intelligence;
            case "soul":
            case "fluency":
                return theme.palette.stats.fluency;
            default:
                return theme.palette.error.main;
        }
    };

    const useStyles = makeStyles({
        progress: {
            borderRadius: "20px",
            height: "100%",
            backgroundPosition: "center",
            backgroundColor: setColor(variant),
            transition: "width 1.2s",
            transitionTimingFunction: "linear",
            width: `${stat > 100 ? 100 : stat < 0 ? 0 : stat}%`,
        },
    });
    const classes = useStyles();

    return <div className={classes.progress} />;
};

export default CustomProgress;
