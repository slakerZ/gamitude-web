import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const RankImage = ({ rankImage }) => {
    const useStyles = makeStyles({
        rankImg: {
            backgroundImage: `url(${rankImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            gridArea: "rank-img",
            borderRadius: "1.5rem",
            boxShadow: "2px 2px 10px #000000",
        },
    });

    const classes = useStyles();
    return <div className={classes.rankImg} />;
};

export default RankImage;
