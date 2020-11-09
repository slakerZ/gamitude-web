import React, { Fragment, FC, ReactElement } from "react";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
// API
import { getStats, getEnergies } from "api/statistics/statistics.api";
// Redux
import { connect } from "react-redux";
import { setEnergies } from "../../../redux/energies/energies.actions";
import { selectEnergies } from "../../../redux/energies/energies.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
import { setStats } from "../../../redux/stats/stats.actions";
import { selectStats } from "../../../redux/stats/stats.selectors";
// Atoms
import CustomIconWithTypography from "../../atoms/custom-icon-with-typography/custom-icon-with-typography.component";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
// Local
import { StatsAndEnergiesType } from "./types";
import useStatsAndEnergiesStyles from "./styles";

const StatsAndEnergies: FC<StatsAndEnergiesType> = ({
    token,
    energies,
    setEnergies,
    stats,
    setStats,
    sessionsComplete,
}: StatsAndEnergiesType): ReactElement => {
    const classes = useStatsAndEnergiesStyles();

    const [getEnergiesState, getEnergiesSubmit] = useAsyncFn(async () => {
        const result = await getEnergies(token);
        setEnergies(result.data);
    }, []);

    const [getStatsState, getStatsSubmit] = useAsyncFn(async () => {
        const result = await getStats(token);
        setStats(result.data);
    }, []);

    useEffectOnce(() => {
        getEnergiesSubmit();
        getStatsSubmit();
    });

    useUpdateEffect(() => {
        getStatsSubmit();
        getEnergiesSubmit();
    }, [sessionsComplete]);

    return (
        <Fragment>
            <div className={classes.root}>
                {getEnergiesState.loading ? (
                    <Skeleton
                        variant="rect"
                        animation="wave"
                        className={classes.placeholder}
                    />
                ) : (
                    <Grid container>
                        <Grid item xs={6}>
                            {getEnergiesState.loading ? (
                                <CircularProgress />
                            ) : getEnergiesState.error ? (
                                <Button
                                    variant="contained"
                                    onClick={getEnergiesSubmit}
                                >
                                    Retry
                                </Button>
                            ) : (
                                <Fragment>
                                    <ToggleAbleTooltip target={"body"}>
                                        <CustomIconWithTypography
                                            variant={"body"}
                                        >
                                            {energies.body.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"emotions"}>
                                        <CustomIconWithTypography
                                            variant={"emotions"}
                                        >
                                            {energies.emotions.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"mind"}>
                                        <CustomIconWithTypography
                                            variant={"mind"}
                                        >
                                            {energies.mind.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"soul"}>
                                        <CustomIconWithTypography
                                            variant={"soul"}
                                        >
                                            {energies.soul.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                </Fragment>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {getStatsState.loading ? (
                                <CircularProgress />
                            ) : getEnergiesState.error ? (
                                <Button
                                    variant="contained"
                                    onClick={getStatsSubmit}
                                >
                                    Retry
                                </Button>
                            ) : (
                                <Fragment>
                                    <ToggleAbleTooltip target={"strength"}>
                                        <CustomIconWithTypography
                                            variant={"strength"}
                                        >
                                            {stats.strength.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"creativity"}>
                                        <CustomIconWithTypography
                                            variant={"creativity"}
                                        >
                                            {stats.creativity.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"intelligence"}>
                                        <CustomIconWithTypography
                                            variant={"intelligence"}
                                        >
                                            {stats.intelligence.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                    <ToggleAbleTooltip target={"fluency"}>
                                        <CustomIconWithTypography
                                            variant={"fluency"}
                                        >
                                            {stats.fluency.toString()}
                                        </CustomIconWithTypography>
                                    </ToggleAbleTooltip>
                                </Fragment>
                            )}
                        </Grid>
                    </Grid>
                )}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    stats: selectStats(state),
    energies: selectEnergies(state),
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setEnergies: (value: any) => dispatch(setEnergies(value)),
    setStats: (value: any) => dispatch(setStats(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsAndEnergies);
