import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
// SVG's
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

const CustomIcon = ({ variant }) => {
    const useStyles = makeStyles(theme => ({
        smallIcon: {
            backgroundColor: theme.palette.warning.dark,
        },

        barIcon: {
            width: "60px",
            height: "60px",
            float: "left",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            padding: "7px",
            "&::after": {
                clear: "both",
            },
        },
    }));

    const classes = useStyles();

    const getIcon = variant => {
        switch (variant) {
            case "Body":
                return <Body className={classes.barIcon} />;
            case "Emotions":
                return <Emotions className={classes.barIcon} />;
            case "Mind":
                return <Mind className={classes.barIcon} />;
            case "Soul":
                return <Soul className={classes.barIcon} />;
            case "Strength":
                return <Strength className={classes.barIcon} />;
            case "Creativity":
                return <Creativity className={classes.barIcon} />;
            case "Intelligence":
                return <Intelligence className={classes.barIcon} />;
            case "Fluency":
                return <Fluency className={classes.barIcon} />;
            default:
                return <div>Icon not found</div>;
        }
    };

    return getIcon(variant);
};

export default CustomIcon;
