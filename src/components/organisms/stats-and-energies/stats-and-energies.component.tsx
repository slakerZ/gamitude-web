import React, { Fragment, FC, ReactElement, useState } from "react";
import axios from "axios";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import Grid from "@material-ui/core/Grid";
import { url, headers } from "../../../api/energies.api";
// Redux
import { connect } from "react-redux";
import { setEnergies } from "../../../redux/energies/energies.actions";
import { selectEnergies } from "../../../redux/energies/energies.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
// Atoms
import CustomIconWithTypography from "../../atoms/custom-icon-with-typography/custom-icon-with-typography.component";
// Local
import { StatsAndEnergiesType } from "./types";

const StatsAndEnergies: FC<StatsAndEnergiesType> = ({
    energies,
    token,
    setEnergies,
    sessionsComplete,
}: StatsAndEnergiesType): ReactElement => {
    const [mappedEnergies, setMappedEnergies] = useState<[string, number][]>([
        ["body", 0],
    ]);
    const { body, emotions, mind, soul } = energies;

    const [getEnergiesState, getEnergies] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data;
        setEnergies({ ...result.data });
        setMappedEnergies([
            ["body", body],
            ["emotions", emotions],
            ["mind", mind],
            ["soul", soul],
        ]);
        return result;
    }, [url]);

    useEffectOnce(() => {
        getEnergies();
    });

    useUpdateEffect(() => {
        getEnergies();
    }, [sessionsComplete]);

    useUpdateEffect(() => {
        setMappedEnergies([
            ["body", body],
            ["emotions", emotions],
            ["mind", mind],
            ["soul", soul],
        ]);
    }, [body, emotions, mind, soul]);

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={6}>
                    {mappedEnergies.map((tuple) => {
                        const [energyName, energyValue] = tuple;
                        console.log(tuple);
                        return (
                            <CustomIconWithTypography
                                variant={energyName}
                                key={energyName}
                            >
                                {energyValue.toString()}
                            </CustomIconWithTypography>
                        );
                    })}
                </Grid>
                <Grid item xs={6}>
                    <CustomIconWithTypography variant="xd">
                        {"xd"}
                    </CustomIconWithTypography>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    energies: selectEnergies(state),
    token: selectToken(state),
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setEnergies: (value: any) => dispatch(setEnergies(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsAndEnergies);
