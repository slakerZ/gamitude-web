import React from "react";
import "./rank-display.styles.scss";

const RankDisplay = ({ Icon }) => {
    return (
        <div className="rank-display">
            <Icon className="stat-icon" />
            <div className="stat-value">15</div>
        </div>
    );
};
export default RankDisplay;
