import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// Tooltips
import RankNameTooltip from "../../tooltips/rank/rank-name.tooltip.jsx";

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
            <Tooltip title={<RankNameTooltip />}>
                <Typography variant="h2" component="h2">
                    {rankName}
                </Typography>
            </Tooltip>
        </div>
    );
};

export default RankName;
