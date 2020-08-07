import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
// Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import CustomOverlayDisplay from "../../atoms/custom-overlay-display/custom-overlay-display.component";
import CustomProgress from "../../atoms/custom-progress/custom-progress.component";

const ProgressBar = ({
    variant,
    stat,
    size,
}: {
    variant: any;
    stat: any;
    size: any;
}) => {
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
            <CustomProgress stat={stat} variant={variant} />
            <CustomOverlayDisplay stat={stat} />
        </div>
    );
};

export default ProgressBar;
