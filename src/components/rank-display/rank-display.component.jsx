import React from "react";
// UI Core
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

const RankDisplay = ({ variant, stat }) => {
    const useStyles = makeStyles({
        rankDisplay: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.rankDisplay}>
            <CustomIcon variant={variant} size="large" />
            <Typography component="h6" variant="h6">
                {stat}
            </Typography>
        </div>
    );
};

export default RankDisplay;
