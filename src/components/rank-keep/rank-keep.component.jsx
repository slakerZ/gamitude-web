import React from "react";
import "./rank-keep.styles.scss";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

import RankDisplay from "../rank-display/rank-display.component.jsx";

const RankKeep = () => (
    <div className="rank-keep">
        <RankDisplay Icon={Strength} />
        <RankDisplay Icon={Creativity} />
        <RankDisplay Icon={Intelligence} />
        <RankDisplay Icon={Fluency} />
    </div>
);
export default RankKeep;
