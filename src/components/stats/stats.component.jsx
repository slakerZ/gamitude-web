import React from "react";
import { useUpdateEffect } from "react-use";
import { connect } from "react-redux";
// Selectors
import { selectSessionsComplete } from "../../redux/projects/projects.selectors";
// Actions
import { setStats } from "../../redux/stats/stats.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const Stats = ({ stats, setStats, sessionsComplete }) => {
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

    // TODO: Connect to API
    useUpdateEffect(() => {
        setStats({
            strength: strength + 0,
            creativity: creativity + 5,
            intelligence: intelligence + 10,
            fluency: fluency + 0,
        });
    }, [sessionsComplete]);

    return (
        <div className={classes.stats}>
            <ProgressBar size="bar" variant="Strength" stat={strength} />
            <ProgressBar size="bar" variant="Creativity" stat={creativity} />
            <ProgressBar
                size="bar"
                variant="Intelligence"
                stat={intelligence}
            />
            <ProgressBar size="bar" variant="Fluency" stat={fluency} />
        </div>
    );
};

const mapStateToProps = state => ({
    stats: state.stats,
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = dispatch => ({
    setStats: value => dispatch(setStats(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
