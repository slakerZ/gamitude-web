import React from "react";
import "./rank-name.styles.scss";
import Typography from "@material-ui/core/Typography";

const RankName = ({ rankName }) => {
    return (
        <Typography variant="h2" component="h2" className="rank-name">
            {rankName}
        </Typography>
    );
};

export default RankName;
