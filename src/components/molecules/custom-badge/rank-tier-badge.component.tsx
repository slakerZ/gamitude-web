import React, { ReactElement } from "react";

import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import useCustomBadgeStyles from "./styles";
import { RankTierBadgePropTypes } from "./types";

const RankTierBadge = ({
    children,
    rank,
    getCurrentRankState,
}: RankTierBadgePropTypes): ReactElement => {
    const classes = useCustomBadgeStyles();
    const { loading, error } = getCurrentRankState;

    return (
        <Badge
            overlap="circle"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            badgeContent={
                <ToggleAbleTooltip target="rankTier" placement="left">
                    <div className={classes.badgeWrapper}>
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <CustomIcon size="small" variant="error" />
                        ) : (
                            <CustomIcon
                                variant={rank.tier.toLowerCase()}
                                size="small"
                            />
                        )}
                    </div>
                </ToggleAbleTooltip>
            }
        >
            {children}
        </Badge>
    );
};

export default RankTierBadge;
