import React, { useState } from "react";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import { ReduxStateType } from "redux/root.reducer";
import { selectSessionsComplete } from "redux/session/session.selectors";
import { selectToken } from "redux/user/user.selectors";

import { getUsersCurrentRank } from "api/rank/rank.api";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import RankTierBadge from "components/molecules/custom-badge/rank-tier-badge.component";

import useRankStyles from "./styles";

const Rank = ({
    token,
    sessionsComplete,
}: {
    token: string;
    sessionsComplete: number;
}) => {
    const [rank, setRank] = useState({
        name: "Loading...",
        tier: "loading",
        imageUrl: "",
    });

    const [getCurrentRankState, getCurrentRank] = useAsyncFn(async () => {
        const response = await getUsersCurrentRank(token);
        setRank(response.data);
    }, []);

    useEffectOnce(() => {
        getCurrentRank();
    });

    useUpdateEffect(() => {
        getCurrentRank();
    }, [sessionsComplete]);

    const classes = useRankStyles();

    return (
        <div className={classes.root}>
            <ToggleAbleTooltip target="rankName" placement="left">
                <Typography variant="h2" component="h2" align="center">
                    {rank.name}
                </Typography>
            </ToggleAbleTooltip>
            <div className={classes.avatarWrapper}>
                <RankTierBadge
                    rank={rank}
                    getCurrentRankState={getCurrentRankState}
                >
                    <ToggleAbleTooltip target="rankImage" placement="left">
                        {getCurrentRankState.loading ? (
                            <Skeleton
                                variant="rect"
                                animation="wave"
                                className={classes.placeholder}
                            />
                        ) : getCurrentRankState.error ? (
                            <CustomIcon variant="notFound" size="avatar" />
                        ) : (
                            <Avatar
                                className={classes.rank}
                                alt="Current Rank"
                                src={rank.imageUrl}
                                imgProps={{ width: 180, height: 180 }}
                            >
                                {"CR"}
                            </Avatar>
                        )}
                    </ToggleAbleTooltip>
                </RankTierBadge>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

export default connect(mapStateToProps)(Rank);
