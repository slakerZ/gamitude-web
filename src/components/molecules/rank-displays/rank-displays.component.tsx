import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import RankDisplay from "../../atoms/rank-display/rank-display.component";

const RankDisplays = ({ rankStats }: { rankStats: any }) => {
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
            <div className={classes.wrapper}>
                <RankDisplay variant="strength" stat={rankStats.strength} />
                <RankDisplay variant="creativity" stat={rankStats.creativity} />
                <RankDisplay
                    variant="intelligence"
                    stat={rankStats.intelligence}
                />
                <RankDisplay variant="fluency" stat={rankStats.fluency} />
            </div>
        </div>
    );
};

export default RankDisplays;
