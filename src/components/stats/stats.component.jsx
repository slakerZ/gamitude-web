import React from "react";
import { useUpdateEffect } from "react-use";
import { connect } from "react-redux";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const Stats = ({ stats }) => {
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
    useUpdateEffect(() => {}, [strength, creativity, intelligence, fluency]);

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
});

export default connect(mapStateToProps)(Stats);
