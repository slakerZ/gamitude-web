import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const ProgressBar = ({ variant, stat }) => {
    const useStyles = makeStyles(theme => ({
        bar: {
            width: "100%",
            height: "60px",
            borderRadius: "20px",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
        },
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

    return (
        <div className="container">
            <div className={classes.bar}>
                <CustomIcon variant={variant} />
                <div className={classes.progress} />
            </div>
        </div>
    );
};

export default ProgressBar;
