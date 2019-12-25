import React from "react";
import { ReactComponent as Help } from "../../assets/icons/question.svg";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    icon: {
        width: "25px",
        height: "25px",
    },
});

const HelpIcon = ({ text }) => {
    const classes = useStyles();
    return (
        <Tooltip title={text}>
            <Help className={classes.icon} />
        </Tooltip>
    );
};

export default HelpIcon;
