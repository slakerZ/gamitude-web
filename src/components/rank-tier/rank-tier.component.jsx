import React from "react";
import "./rank-tier.styles.scss";
import Typography from "@material-ui/core/Typography";

const RankTier = ({ rankTier }) => {
    return (
        <Typography variant="h2" component="h2" className="tier">
            Tier {rankTier}
        </Typography>
    );
};

export default RankTier;
