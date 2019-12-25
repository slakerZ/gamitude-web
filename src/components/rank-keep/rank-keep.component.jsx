import React from "react";
import "./rank-keep.styles.scss";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

import HelpIcon from "../help-icon/help-icon.component.jsx";

const RankKeep = () => (
    <div className="rank-keep">
        12 Strength 10 Creativity 10 Intelligence 10 Fluency
        <HelpIcon text="This indicates by how much you have to increase given stat to keep your current rank" />
    </div>
);
export default RankKeep;
