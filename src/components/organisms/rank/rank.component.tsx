import React, { useState } from "react";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
// API
import { getUsersCurrentRank } from "api/rank/rank.api";
// Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import Skeleton from "@material-ui/lab/Skeleton";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
// Local
import useRankStyles from "./styles";
import { ReduxStateType } from "../../../redux/root.reducer";

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
            <ToggleAbleTooltip target="rankName">
                <Typography variant="h2" component="h2" align="center">
                    {rank.name}
                </Typography>
            </ToggleAbleTooltip>
            <div className={classes.avatarWrapper}>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <ToggleAbleTooltip target="rankTier">
                            <div className={classes.badgeWrapper}>
                                {getCurrentRankState.loading ? (
                                    <CircularProgress />
                                ) : getCurrentRankState.error ? (
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
                    <ToggleAbleTooltip target="rankImage">
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
                                alt="Your productivity Spirit Animal"
                                src={rank.imageUrl}
                            />
                        )}
                    </ToggleAbleTooltip>
                </Badge>
            </div>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

export default connect(mapStateToProps)(Rank);
