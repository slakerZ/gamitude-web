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
// Selectors
import { selectStats } from "../../redux/stats/stats.selectors.js";
import { selectRank } from "../../redux/rank/rank.selectors.js";

const Rank = ({ stats, ranks }) => {
    const { strength, creativity, intelligence, fluency } = stats;

    const defaultRank = {
        name: "Sloth",
        tier: "F",
        imageUrl:
            "https://www.kidzone.ws/animal-facts/sloths/images/sloth-1.jpg",
        rankFortes: ["intelligence", "creativity"],
    };

    const rankFromDb =
        ranks[`${strength}-${creativity}-${intelligence}-${fluency}`] ||
        defaultRank;

    const useStyles = makeStyles(theme => {
        const gradientFromFortes = () => {
            const colors = [];
            rankFromDb.rankFortes.forEach(el => {
                switch (el) {
                    case "strength":
                        colors.push(theme.palette.stats.strength);
                        break;
                    case "creativity":
                        colors.push(theme.palette.stats.creativity);
                        break;
                    case "intelligence":
                        colors.push(theme.palette.stats.intelligence);
                        break;
                    case "fluency":
                        colors.push(theme.palette.stats.fluency);
                        break;
                    default:
                        break;
                }
            });

            return colors;
        };
        return {
            rank: {
                backgroundColor: `${gradientFromFortes()[0]}`,
                backgroundImage: `linear-gradient(to right, ${gradientFromFortes().join(
                    ","
                )})`,
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
        };
    });
    const classes = useStyles();

    return (
        <div className={classes.rank}>
            <RankImage rankImage={rankFromDb.imageUrl} />
            <RankTier rankTier={rankFromDb.tier} />
            <RankName rankName={rankFromDb.name} />
            <RankDisplays />
            <RankColors rankFortes={rankFromDb.rankFortes} />
        </div>
    );
};

const mapStateToProps = state => ({
    stats: selectStats(state),
    ranks: selectRank(state),
});

export default connect(mapStateToProps)(Rank);
