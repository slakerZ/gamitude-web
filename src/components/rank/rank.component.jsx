import React from "react";
import "./rank.styles.scss";

import RankInfo from "../rank-info/rank-info.component.jsx";
import RankKeep from "../rank-keep/rank-keep.component.jsx";

const Rank = () => {
    return (
        <div className="rank">
            <RankInfo />
            <RankKeep />
        </div>
    );
};

export default Rank;
