import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// UI Lab
import Skeleton from "@material-ui/lab/Skeleton";

const RankImage = ({ rankImage, state }: { rankImage: any; state: any }) => {
    const useStyles = makeStyles((theme) => ({
        rankImg: {
            maxWidth: "100%",
            height: "auto",
            border: `solid 2px ${theme.palette.secondary.main}`,
        },
        placeholder: {
            gridArea: "rank-img",
            maxWidth: "100%",
            height: "auto",
        },
        center: {
            display: "flex",
            justifyContent: "center",
            gridArea: "rank-img",
        },
    }));
    const classes = useStyles();

    return state.loading ? (
        <Skeleton
            variant="rect"
            animation="wave"
            className={classes.placeholder}
        />
    ) : state.error ? (
        <div>state.error.message</div>
    ) : (
        <div className={classes.center}>
            <img
                src={rankImage}
                className={classes.rankImg}
                alt="Your productivy-spirit animal"
            />
        </div>
    );
};

export default RankImage;
