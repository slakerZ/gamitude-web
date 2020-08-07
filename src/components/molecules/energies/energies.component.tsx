import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
// API
import { url, headers } from "../../../api/energies.api";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Actions
import { setEnergies } from "../../../redux/energies/energies.actions";
// Selectors
import { selectEnergies } from "../../../redux/energies/energies.selectors";
import { selectToken } from "../../../redux/user/user.selectors";
import { selectSessionsComplete } from "../../../redux/session/session.selectors";
// Components
import ProgressBar from "../progress-bar/progress-bar.component";
import StatsBackend from "../../atoms/stats-backend/stats-backend.component";

const Energies = ({
    energies,
    token,
    setEnergies,
    sessionsComplete,
}: {
    energies: { body: any; emotions: any; mind: any; soul: any };
    token: any;
    setEnergies: any;
    sessionsComplete: any;
}) => {
    const { body, emotions, mind, soul } = energies;

    const useStyles = makeStyles({
        energies: {
            gridArea: "energies",
            display: "flex",
            flexDirection: "column",
            justifyItems: "stretch",
            justifyContent: "space-around",
        },
    });
    const classes = useStyles();

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data;
        setEnergies({ ...result.data });
        return result;
    }, [url]);

    useEffectOnce(() => {
        submit();
    });

    useUpdateEffect(() => {
        submit();
    }, [sessionsComplete]);

    useUpdateEffect(() => {}, [body, emotions, mind, soul]);

    return state.error || state.loading ? (
        <StatsBackend state={state} submit={submit} />
    ) : (
        <div className={classes.energies}>
            <ProgressBar size="bar" stat={body} variant="body" />
            <ProgressBar size="bar" stat={emotions} variant="emotions" />
            <ProgressBar size="bar" stat={mind} variant="mind" />
            <ProgressBar size="bar" stat={soul} variant="soul" />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Energies);
