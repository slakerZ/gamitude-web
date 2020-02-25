import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";
import CustomOverlayDisplay from "../custom-overlay-display/custom-overlay-display.component.jsx";
import CustomProgress from "../custom-progress/custom-progress.component.jsx";

const ProgressBar = ({ variant, stat, size }) => {
    const useStyles = makeStyles({
        bar: {
            width: "100%",
            height: "60px",
            borderRadius: "20px",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
            position: "relative",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.bar}>
            <CustomIcon size={size} variant={variant} />
            <CustomProgress stat={stat} />
            <CustomOverlayDisplay stat={stat} />
        </div>
    );
};

export default ProgressBar;
