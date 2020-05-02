import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// Components
import RankDisplay from "../rank-display/rank-display.component.jsx";
// Tooltip
import RankDisplaysTooltip from "../../tooltips/rank/rank-displays.tooltip.jsx";

const RankDisplays = () => {
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

    const gepardReq = {
        strength: 0,
        creativity: 5,
        intelligence: 10,
        fluency: 0,
    };

    return (
        <div className={classes.rankDisplays}>
            <Tooltip title={<RankDisplaysTooltip />}>
                <div className={classes.wrapper}>
                    <RankDisplay variant="strength" stat={gepardReq.strength} />
                    <RankDisplay
                        variant="creativity"
                        stat={gepardReq.creativity}
                    />
                    <RankDisplay
                        variant="intelligence"
                        stat={gepardReq.intelligence}
                    />
                    <RankDisplay variant="fluency" stat={gepardReq.fluency} />
                </div>
            </Tooltip>
        </div>
    );
};

export default RankDisplays;
