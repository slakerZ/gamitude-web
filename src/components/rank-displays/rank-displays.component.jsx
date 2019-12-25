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
    const slothRequirements = {
        strength: 15,
        creativity: 25,
        intelligence: 35,
        fluency: 55,
    };
    return (
        <div className="rank-displays">
            <RankDisplay
                Icon={Strength}
                Diff={slothRequirements.strength - strength}
            />
            <RankDisplay
                Icon={Creativity}
                Diff={slothRequirements.creativity - creativity}
            />
            <RankDisplay
                Icon={Intelligence}
                Diff={slothRequirements.intelligence - intelligence}
            />
            <RankDisplay
                Icon={Fluency}
                Diff={slothRequirements.fluency - fluency}
            />
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
