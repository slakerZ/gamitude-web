import React from "react";
import "./rank.styles.scss";

import RankInfo from "../rank-info/rank-info.component.jsx";
import RankKeep from "../rank-keep/rank-keep.component.jsx";
import HelpIcon from "../help-icon/help-icon.component.jsx";

const Rank = () => {
    return (
        <div className="rank">
            <RankInfo />
            <RankKeep />
            <HelpIcon text="This indicates by how much you have to increase given stat to keep your current rank" />
        </div>
    );
};

export default Rank;
