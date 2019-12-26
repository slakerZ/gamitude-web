import React from "react";
import "./rank.styles.scss";
import { connect } from "react-redux";

import RankInfo from "../rank-info/rank-info.component.jsx";

const Rank = ({ strength, creativity, intelligence, fluency, ranks }) => {
    const defaultRank = {
        name: "Sloth",
        tier: "F",
        imageUrl:
            "https://www.kidzone.ws/animal-facts/sloths/images/sloth-1.jpg",
    };

    const rankFromDb =
        ranks[`${strength}-${creativity}-${intelligence}-${fluency}`] ||
        defaultRank;

    return (
        <div className="rank">
            <RankInfo
                rankName={rankFromDb.name}
                rankTier={rankFromDb.tier}
                rankImage={rankFromDb.imageUrl}
            />
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
