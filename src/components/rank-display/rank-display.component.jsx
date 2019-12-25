import React from "react";
import "./rank-display.styles.scss";

const RankDisplay = ({ Icon, Diff }) => {
    return (
        <div className="rank-display">
            <Icon className="stat-icon" />
            <div className="stat-value">{Diff}</div>
        </div>
    );
};

export default RankDisplay;
