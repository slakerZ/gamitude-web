import React from "react";
import "./rank-info.styles.scss";

import RankDisplays from "../rank-displays/rank-displays.component.jsx";
import RankImage from "../rank-image/rank-image.component.jsx";
import RankTier from "../rank-tier/rank-tier.component.jsx";
import RankName from "../rank-name/rank-name.component.jsx";

const RankInfo = ({ rankName, rankTier, rankImage }) => {
    return (
        <div className="rank-info">
            <RankImage rankImage={rankImage} />
            <RankTier rankTier={rankTier} />
            <RankName rankName={rankName} />
            <RankDisplays />
        </div>
    );
};

export default RankInfo;
