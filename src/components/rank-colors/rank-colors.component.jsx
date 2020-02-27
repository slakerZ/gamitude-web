import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const RankColors = () => {
    const useStyles = makeStyles({
        rankColors: {
            gridArea: "rank-colors",
        },
    });
    const classes = useStyles();

    return <div className={classes.rankColors}></div>;
};

export default RankColors;
