import React from "react";
import { connect } from "react-redux";
import "./rank-displays.styles.scss";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

import RankDisplay from "../rank-display/rank-display.component.jsx";

const RankDisplays = ({ strength, creativity, intelligence, fluency }) => {
    const gepardReq = {
        strength: 0,
        creativity: 5,
        intelligence: 10,
        fluency: 0,
    };

    return (
        <div className="rank-displays">
            <RankDisplay Icon={Strength} Diff={strength - gepardReq.strength} />
            <RankDisplay
                Icon={Creativity}
                Diff={creativity - gepardReq.creativity}
            />
            <RankDisplay
                Icon={Intelligence}
                Diff={intelligence - gepardReq.intelligence}
            />
            <RankDisplay Icon={Fluency} Diff={fluency - gepardReq.fluency} />
        </div>
    );
};
const mapStateToProps = state => ({
    strength: state.stats.strength,
    creativity: state.stats.creativity,
    intelligence: state.stats.intelligence,
    fluency: state.stats.fluency,
});

export default connect(mapStateToProps)(RankDisplays);
