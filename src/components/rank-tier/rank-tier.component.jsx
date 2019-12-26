import React from "react";
import "./rank-tier.styles.scss";
import Typography from "@material-ui/core/Typography";

const RankTier = ({ rankTier }) => {
    return (
        <div className="tier">
            <Typography variant="h2" component="h2">
                Tier {rankTier}
            </Typography>
        </div>
    );
};

export default RankTier;
