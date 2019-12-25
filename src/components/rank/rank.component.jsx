import React from "react";
import "./rank.styles.scss";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

import RankInfo from "../rank-info/rank-info.component.jsx";

const Rank = () => {
    return (
        <div className="rank">
            <RankInfo />
            <div className="rank-keep">
                You need <br />
                12 more Strength 10 more Creativity 10 more Intelligence 10 more
                Fluency to keep your current rank
            </div>
        </div>
    );
};

export default Rank;
