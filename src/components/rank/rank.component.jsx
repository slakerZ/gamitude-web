import React from "react";
import "./rank.styles.scss";

import RankInfo from "../rank-info/rank-info.component.jsx";
import HelpIcon from "../help-icon/help-icon.component.jsx";

const Rank = () => {
    const gotRank = {
        name: "Sloth",
        tier: "F",
        imageUrl: require("../../assets/ranks_default/sloth-1.jpg"),
    };
    return (
        <div className="rank">
            <RankInfo
                rankName={gotRank.name}
                rankTier={gotRank.tier}
                rankImage={gotRank.imageUrl}
            />
            <HelpIcon text="This indicates by how much you have to increase given stat to keep your current rank" />
        </div>
    );
};

export default Rank;
