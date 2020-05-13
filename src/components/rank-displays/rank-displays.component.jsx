import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// Components
import RankDisplay from "../rank-display/rank-display.component.jsx";
// Tooltip
import RankDisplaysTooltip from "../../tooltips/rank/rank-displays.tooltip.jsx";

const RankDisplays = ({ rankStats }) => {
    const useStyles = makeStyles({
        rankDisplays: {
            gridArea: "rank-displays",
        },
        wrapper: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.rankDisplays}>
            <Tooltip title={<RankDisplaysTooltip />}>
                <div className={classes.wrapper}>
                    <RankDisplay variant="strength" stat={rankStats.strength} />
                    <RankDisplay
                        variant="creativity"
                        stat={rankStats.creativity}
                    />
                    <RankDisplay
                        variant="intelligence"
                        stat={rankStats.intelligence}
                    />
                    <RankDisplay variant="fluency" stat={rankStats.fluency} />
                </div>
            </Tooltip>
        </div>
    );
};

export default RankDisplays;
