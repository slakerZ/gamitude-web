import React from "react";
import { ReactComponent as Help } from "../../assets/icons/question.svg";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    icon: {
        width: "25px",
        height: "25px",
    },
    tooltip: {
        position: "absolute",
        bottom: "0",
        right: "0",
    },
    rel: {
        position: "relative",
    },
});

const HelpIcon = ({ text }) => {
    const classes = useStyles();
    return (
        <div className={classes.rel}>
            <Tooltip className={classes.tooltip} title={text}>
                <Help className={classes.icon} />
            </Tooltip>
        </div>
    );
};

export default HelpIcon;
