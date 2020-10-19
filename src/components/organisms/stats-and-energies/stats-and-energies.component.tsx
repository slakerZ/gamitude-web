import React, { Fragment, FC, ReactElement, useState } from "react";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
// API
import { getStats, getEnergies } from "../../../api/stats/stats.api";
// Redux
import { connect } from "react-redux";
import { setEnergies } from "../../../redux/energies/energies.actions";
import { selectEnergies } from "../../../redux/energies/energies.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
import { setStats } from "../../../redux/stats/stats.actions";
import { selectStats } from "../../../redux/stats/stats.selectors";
// Atoms
import CustomIconWithTypography from "../../molecules/custom-icon-with-typography/custom-icon-with-typography.component";
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

    const [mappedEnergies, setMappedEnergies] = useState<[string, number][]>([
        ["body", 0],
        ["emotions", 0],
        ["mind", 0],
        ["soul", 0],
    ]);

    const [mappedStats, setMappedStats] = useState<[string, number][]>([
        ["strength", 0],
        ["creativity", 0],
        ["intelligence", 0],
        ["fluency", 0],
    ]);

    const [getEnergiesState, getEnergiesSubmit] = useAsyncFn(async () => {
        const result = await getEnergies(token);
        setEnergies(result);
        setMappedEnergies([
            ["body", result.body],
            ["emotions", result.emotions],
            ["mind", result.mind],
            ["soul", result.soul],
        ]);
        return result;
    }, []);

    const [getStatsState, getStatsSubmit] = useAsyncFn(async () => {
        const result = await getStats(token);
        setStats(result);
        setMappedStats([
            ["strength", result.strength],
            ["creativity", result.creativity],
            ["intelligence", result.intelligence],
            ["fluency", result.fluency],
        ]);
        return result;
    }, []);

    useEffectOnce(() => {
        getEnergiesSubmit();
        getStatsSubmit();
    });

    useUpdateEffect(() => {
        getStatsSubmit();
        getEnergiesSubmit();
    }, [sessionsComplete]);

    // Not sure if necesssary
    // useUpdateEffect(() => {
    //     setMappedEnergies([
    //         ["body", body],
    //         ["emotions", emotions],
    //         ["mind", mind],
    //         ["soul", soul],
    //     ]);
    //     setMappedStats([
    //         ["strength", strength],
    //         ["creativity", creativity],
    //         ["intelligence", intelligence],
    //         ["fluency", fluency],
    //     ]);
    // }, [
    //     body,
    //     emotions,
    //     mind,
    //     soul,
    //     strength,
    //     creativity,
    //     intelligence,
    //     fluency,
    // ]);

    return (
        <Fragment>
            <div className={classes.root}>
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
                            mappedEnergies.map((tuple) => {
                                const [energyName, energyValue] = tuple;
                                return (
                                    <CustomIconWithTypography
                                        variant={energyName}
                                        key={energyName}
                                    >
                                        {energyValue.toString()}
                                    </CustomIconWithTypography>
                                );
                            })
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
                            mappedStats.map((tuple) => {
                                const [statName, statValue] = tuple;
                                return (
                                    <CustomIconWithTypography
                                        variant={statName}
                                        key={statName}
                                    >
                                        {statValue.toString()}
                                    </CustomIconWithTypography>
                                );
                            })
                        )}
                    </Grid>
                </Grid>
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
