import React from "react";

import RankInfo from "../rank-info/rank-info.component.jsx";
import HelpIcon from "../help-icon/help-icon.component.jsx";

const Rank = () => {
    return (
        <div className="rank">
            <RankInfo
                rankName={"Sloth"}
                rankTier={"F"}
                rankImage={require("../../assets/ranks_default/sloth-1.jpg")}
            />
            <HelpIcon text="This indicates by how much you have to increase given stat to keep your current rank" />
        </div>
    );
};

export default Rank;
