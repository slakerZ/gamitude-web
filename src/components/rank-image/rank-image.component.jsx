import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// UI Lab
import Skeleton from "@material-ui/lab/Skeleton";
// Tooltips
import RankImageTooltip from "../../tooltips/rank/rank-image.tooltip.jsx";

const RankImage = ({ rankImage, state }) => {
    const useStyles = makeStyles(theme => ({
        rankImg: {
            maxWidth: "100%",
            height: "auto",
            border: `solid 2px ${theme.palette.secondary.darker}`,
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
            <Tooltip title={<RankImageTooltip />}>
                <img
                    src={rankImage}
                    className={classes.rankImg}
                    alt="Your productivy-spirit animal"
                />
            </Tooltip>
        </div>
    );
};

export default RankImage;
