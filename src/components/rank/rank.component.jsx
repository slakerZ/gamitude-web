import React from "react";
import "./rank.styles.scss";
import { connect } from "react-redux";

import RankInfo from "../rank-info/rank-info.component.jsx";
import HelpIcon from "../help-icon/help-icon.component.jsx";

const Rank = ({ strength, creativity, intelligence, fluency, ranks }) => {
    const gotRank =
        ranks[`${strength}-${creativity}-${intelligence}-${fluency}`];
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

const mapStateToProps = state => ({
    strength: state.stats.strength,
    creativity: state.stats.creativity,
    intelligence: state.stats.intelligence,
    fluency: state.stats.fluency,
    ranks: state.rank.ranks,
});

export default connect(mapStateToProps)(Rank);
