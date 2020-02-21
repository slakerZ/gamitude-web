import React, { useState } from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// UI Lab
import Skeleton from "@material-ui/lab/Skeleton";

const RankImage = ({ rankImage }) => {
    const useStyles = makeStyles({
        rankImg: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "1.5rem",
            boxShadow: "2px 2px 10px #000000",
        },
        placeholder: {
            gridArea: "rank-img",
            width: "100%",
            height: "100%",
        },
        center: {
            display: "flex",
            justifyContent: "center",
            gridArea: "rank-img",
        },
    });
    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    return loading ? (
        <Skeleton
            variant="rect"
            animation="wave"
            className={classes.placeholder}
            // Remove later
            onClick={() => setLoading(!loading)}
        />
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
