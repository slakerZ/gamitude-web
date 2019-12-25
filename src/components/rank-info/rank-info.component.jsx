import React from "react";
import "./rank-info.styles.scss";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import RankDisplays from "../rank-displays/rank-displays.component.jsx";

const RankInfo = ({ rankName, rankTier, rankImage }) => {
    const useStyles = makeStyles({
        rankImg: {
            backgroundImage: `url(${rankImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            gridArea: "rank-img",
            borderRadius: "15px",
            border: "10px inset silver",
        },
    });
    const classes = useStyles();
    return (
        <div className="rank-info">
            <div className={classes.rankImg} />
            <Typography variant="h2" component="h2" className="tier">
                Tier {rankTier}
            </Typography>
            <Typography variant="h2" component="h2" className="rank-name">
                {rankName}
            </Typography>
            <RankDisplays />
        </div>
    );
};

export default RankInfo;
