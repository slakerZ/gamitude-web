import React from "react";
//UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const CustomOverlayDisplay = ({ stat }) => {
    const useStyles = makeStyles({
        statDisplay: {
            width: "100%",
            textAlign: "center",
            position: "absolute",
            top: "12px",
            bottom: "12px",
            color: stat > 100 ? "red" : "#FFFFFF",
        },
    });
    const classes = useStyles();

    return (
        <Typography variant="h4" component="h4" className={classes.statDisplay}>
            {stat}
        </Typography>
    );
};

export default CustomOverlayDisplay;
