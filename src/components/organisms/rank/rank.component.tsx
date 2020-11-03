import React, { useState } from "react";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import { ReduxStateType } from "../../../redux/root.reducer";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
import { selectToken } from "../../../redux/user/user.selectors";

import { getRank } from "../../../api/stats/stats.api";

import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";

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
        rankFortes: ["intelligence", "creativity"],
    });

    const [state, submit] = useAsyncFn(async () => {
        const result = await getRank(token);
        setRank({
            name: result.name,
            tier: result.tier,
            imageUrl: result.imageUrl,
            rankFortes: ["intelligence", "creativity", "fluency", "strength"],
        });
    }, []);

    useEffectOnce(() => {
        submit();
    });

    useUpdateEffect(() => {
        submit();
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
                                {state.loading ? (
                                    <CircularProgress />
                                ) : state.error ? (
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
                        {state.loading ? (
                            <Skeleton
                                variant="rect"
                                animation="wave"
                                className={classes.placeholder}
                            />
                        ) : state.error ? (
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
