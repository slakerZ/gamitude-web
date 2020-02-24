import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const RankTier = ({ rankTier }) => {
    const useStyles = makeStyles({
        rankTier: {
            gridArea: "rank-tier",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
        },
    });

    const classes = useStyles();

    return (
        <div className={classes.rankTier}>
            <Typography variant="h2" component="h2">
                {rankTier}
            </Typography>
        </div>
    );
};

export default RankTier;
