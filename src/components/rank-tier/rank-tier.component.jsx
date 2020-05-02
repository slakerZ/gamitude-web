import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const RankTier = ({ rankTier }) => {
    const useStyles = makeStyles(theme => {
        const tierToColor = () => {
            switch (rankTier) {
                case "S":
                    return theme.palette.tiers.s;
                case "A":
                    return theme.palette.tiers.a;
                case "B":
                    return theme.palette.tiers.b;
                case "C":
                    return theme.palette.tiers.c;
                case "D":
                    return theme.palette.tiers.d;
                case "F":
                    return theme.palette.tiers.f;
                default:
                    return theme.palette.error.main;
            }
        };
        return {
            rankTier: {
                backgroundColor: theme.palette.primary.main,
                backgroundImage: `linear-gradient(black, black)`,
                gridArea: "rank-tier",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "2px 2px 10px #000000",
                borderRadius: "100%",
                border: "3px solid black",
            },
            text: {
                color: `${tierToColor()}`,
                fontFamily: "Atomic Age",
                fontWeight: "bold",
            },
        };
    });
    const classes = useStyles();

    return (
        <div className={classes.rankTier}>
            <Typography variant="h2" component="h2" className={classes.text}>
                {rankTier}
            </Typography>
        </div>
    );
};

export default RankTier;
