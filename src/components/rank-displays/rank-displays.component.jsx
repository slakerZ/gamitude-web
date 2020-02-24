import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import RankDisplay from "../rank-display/rank-display.component.jsx";

const RankDisplays = () => {
    const useStyles = makeStyles({
        rankDisplays: {
            gridArea: "rank-displays",
            boxShadow: "2px 2px 10px #000000",
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
            <RankDisplay variant="Strength" stat={gepardReq.strength} />
            <RankDisplay variant="Creativity" stat={gepardReq.creativity} />
            <RankDisplay variant="Intelligence" stat={gepardReq.intelligence} />
            <RankDisplay variant="Fluency" stat={gepardReq.fluency} />
        </div>
    );
};

export default RankDisplays;
