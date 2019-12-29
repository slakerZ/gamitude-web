import React from "react";
import "./rank-display.styles.scss";
import { Typography } from "@material-ui/core";

const RankDisplay = ({ Icon, Diff }) => {
    return (
        <div className="rank-display">
            <Icon className="stat-icon" />
            <Typography component="h6" variant="h6" className="stat-value">
                {Diff}
            </Typography>
        </div>
    );
};

export default RankDisplay;
