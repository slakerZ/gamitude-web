import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";
import CustomOverlayDisplay from "../custom-overlay-display/custom-overlay-display.component.jsx";
import CustomProgress from "../custom-progress/custom-progress.component.jsx";
// Tooltips
import FluencyTooltip from "../../tooltips/stats/fluency.tooltip.jsx";
import StrengthTooltip from "../../tooltips/stats/strength.tooltip.jsx";
import IntelligenceTooltip from "../../tooltips/stats/intelligence.tooltip.jsx";
import CreativityTooltip from "../../tooltips/stats/creativity.tooltip.jsx";

const ProgressBar = ({ variant, stat, size }) => {
    const useStyles = makeStyles({
        bar: {
            width: "100%",
            height: "60px",
            borderRadius: "20px",
            boxShadow: "2px 2px 10px #000000",
            backgroundColor: "transparent",
            position: "relative",
        },
    });
    const classes = useStyles();

    const tooltipForStat = variant => {
        switch (variant) {
            case "strength":
                return <StrengthTooltip />;
            case "creativity":
                return <CreativityTooltip />;
            case "intelligence":
                return <IntelligenceTooltip />;
            case "fluency":
                return <FluencyTooltip />;
            default:
                return <StrengthTooltip />;
        }
    };

    return (
        <Tooltip title={tooltipForStat(variant)}>
            <div className={classes.bar}>
                <CustomIcon size={size} variant={variant} />
                <CustomProgress stat={stat} variant={variant} />
                <CustomOverlayDisplay stat={stat} />
            </div>
        </Tooltip>
    );
};

export default ProgressBar;
