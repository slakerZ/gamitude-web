import React from "react";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Components
import RankDisplays from "../rank-displays/rank-displays.component.jsx";
import RankImage from "../rank-image/rank-image.component.jsx";
import RankTier from "../rank-tier/rank-tier.component.jsx";
import RankName from "../rank-name/rank-name.component.jsx";
import RankColors from "../rank-colors/rank-colors.component.jsx";

const Rank = ({ strength, creativity, intelligence, fluency, ranks }) => {
    /**"rank-name rank-tier"
                "rank-img rank-img"
                "rank-displays rank-displays" */
    const useStyles = makeStyles(theme => ({
        rank: {
            backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.complement.main})`,
            boxShadow: "2px 2px 10px #000000",
            borderRadius: "15px",
            gridArea: "rank",
            display: "grid",
            gap: "1rem",
            padding: "5px",
            border: "solid 10px black",
            gridTemplateColumns: "15px 3fr 80px 3fr 15px",
            gridTemplateRows: "2fr 350px 1fr 6fr 80px",
            gridTemplateAreas: `
                ". rank-name rank-name rank-name ."
                ". rank-img rank-img rank-img ."
                ". rank-displays rank-displays rank-displays ."
                ". rank-colors rank-colors rank-colors ."
                ". . rank-tier . ."  
            `,
        },
    }));
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
            <RankColors />
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
