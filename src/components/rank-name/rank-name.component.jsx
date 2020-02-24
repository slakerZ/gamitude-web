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
            boxShadow: "2px 2px 10px #000000",
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
