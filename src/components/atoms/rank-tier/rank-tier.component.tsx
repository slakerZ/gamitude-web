import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const RankTier = ({ rankTier }: { rankTier: any }) => {
    const useStyles = makeStyles((theme) => {
        const tierToColor = () => {
            switch (rankTier) {
                case "S":
                    return theme.palette.primary.main;
                case "A":
                    return theme.palette.primary.main;
                case "B":
                    return theme.palette.primary.main;
                case "C":
                    return theme.palette.primary.main;
                case "D":
                    return theme.palette.primary.main;
                case "F":
                    return theme.palette.primary.main;
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
