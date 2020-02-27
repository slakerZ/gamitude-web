import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const RankName = ({ rankName }) => {
    const useStyles = makeStyles({
        rankName: {
            gridArea: "rank-name",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.rankName}>
            <Typography variant="h2" component="h2">
                {rankName}
            </Typography>
        </div>
    );
};

export default RankName;
