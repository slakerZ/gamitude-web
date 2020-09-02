import React, { useState } from "react";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
// API
import { getRank } from "../../../api/rank.api";
// Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import Skeleton from "@material-ui/lab/Skeleton";

// Selectors
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
// Local
import useRankStyles from "./styles";

const Rank = ({
    token,
    sessionsComplete,
}: {
    token: string;
    sessionsComplete: number;
}) => {
    const [rank, setRank] = useState({
        name: "Error Fetching",
        tier: "error",
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
            <Typography variant="h2" component="h2" align="center">
                {rank.name}
            </Typography>
            <div className={classes.avatarWrapper}>
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <div className={classes.badgeWrapper}>
                            <CustomIcon
                                variant={rank.tier.toLowerCase()}
                                size="small"
                            />
                        </div>
                    }
                >
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
                </Badge>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

export default connect(mapStateToProps)(Rank);
