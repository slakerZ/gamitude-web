import React from "react";
import axios from "axios";
import { useUpdateEffect, useAsyncFn, useEffectOnce } from "react-use";
import { connect } from "react-redux";
// API
import { url, headers } from "./stats.api";
// Actions
import { setStats } from "../../redux/stats/stats.actions";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Selectors
import { selectStats } from "../../redux/stats/stats.selectors.js";
import { selectToken } from "../../redux/user/user.selectors";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";
import StatsBackend from "../stats-backend/stats-backend.component.jsx";

const Stats = ({ stats, token, setStats }) => {
    const { strength, creativity, intelligence, fluency } = stats;

    const useStyles = makeStyles({
        stats: {
            display: "flex",
            flexDirection: "column",
            justifyItems: "stretch",
            justifyContent: "space-around",
            gridArea: "stats",
        },
    });
    const classes = useStyles();

    const [state, submit] = useAsyncFn(async () => {
        const response = await axios.get(url, headers(token));
        const result = await response.data;
        setStats(result.data);
        return result;
    }, [url]);

    useEffectOnce(() => {
        submit();
    });

    useUpdateEffect(() => {}, [strength, creativity, intelligence, fluency]);

    return state.error || state.loading ? (
        <StatsBackend state={state} submit={submit} />
    ) : (
        <div className={classes.stats}>
            <ProgressBar size="bar" variant="strength" stat={strength} />
            <ProgressBar size="bar" variant="creativity" stat={creativity} />
            <ProgressBar
                size="bar"
                variant="intelligence"
                stat={intelligence}
            />
            <ProgressBar size="bar" variant="fluency" stat={fluency} />
        </div>
    );
};

const mapStateToProps = state => ({
    stats: selectStats(state),
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    setStats: value => dispatch(setStats(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
