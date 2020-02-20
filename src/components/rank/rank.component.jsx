import React from "react";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import RankDisplays from "../rank-displays/rank-displays.component.jsx";
import RankImage from "../rank-image/rank-image.component.jsx";
import RankTier from "../rank-tier/rank-tier.component.jsx";
import RankName from "../rank-name/rank-name.component.jsx";

const Rank = ({ strength, creativity, intelligence, fluency, ranks }) => {
    const useStyles = makeStyles({
        rank: {
            boxShadow: "2px 2px 10px #000000",
            borderRadius: "15px",
            padding: "25px",
            gridArea: "rank",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 3fr 2fr",
            gridTemplateAreas: `
                "rank-name tier"
                "rank-img rank-img"
                "rank-displays rank-displays"
            `,
        },
    });
    const classes = useStyles();

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
        <div className={classes.rank}>
            <RankImage rankImage={rankFromDb.imageUrl} />
            <RankTier rankTier={rankFromDb.tier} />
            <RankName rankName={rankFromDb.name} />
            <RankDisplays />
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
