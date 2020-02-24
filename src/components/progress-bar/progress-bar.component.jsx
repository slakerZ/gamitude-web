import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

// TODO: Rethink whether to refactor further
const ProgressBar = ({ variant, stat, size }) => {
    const useStyles = makeStyles(theme => ({
        bar: {
            width: "100%",
            height: "60px",
            borderRadius: "20px",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
            position: "relative",
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
        statDisplay: {
            width: "100%",
            textAlign: "center",
            position: "absolute",
            top: "12px",
            bottom: "12px",
        },
    }));
    const classes = useStyles();

    return (
        <div className="container">
            <div className={classes.bar}>
                <CustomIcon size={size} variant={variant} />
                <div className={classes.progress} />
                <Typography
                    variant="h4"
                    component="h4"
                    className={classes.statDisplay}
                >
                    {stat}
                </Typography>
            </div>
        </div>
    );
};

export default ProgressBar;
