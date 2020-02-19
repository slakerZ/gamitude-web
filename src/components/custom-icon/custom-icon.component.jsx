import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";

const CustomIcon = ({ variant }) => {
    const useStyles = makeStyles(theme => ({
        smallIcon: {},
        barIcon: {
            width: "4vh",
            height: "4vh",
            float: "left",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            backgroundColor: theme.palette.info.dark,
            padding: "0.3rem",
        },
    }));

    const classes = useStyles();

    return <div className={classes.barIcon}></div>;
};

export default CustomIcon;
