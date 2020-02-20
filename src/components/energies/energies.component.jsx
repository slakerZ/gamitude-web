import React from "react";
import { connect } from "react-redux";
import { useUpdateEffect } from "react-use";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Selectors
import { selectSessionsComplete } from "../../redux/projects/projects.selectors";
import { selectEnergies } from "../../redux/energies/energies.selectors";
// Actions
import { setEnergies } from "../../redux/energies/energies.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Energies = ({ energies, setEnergies, sessionsComplete }) => {
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

    // TODO: Connect to API
    useUpdateEffect(() => {
        setEnergies({
            body: body - 5,
            emotions: emotions - 10,
            mind: mind - 15,
            soul: soul - 5,
        });
    }, [sessionsComplete]);

    return (
        <div className={classes.energies}>
            <ProgressBar size="bar" stat={body} variant="Body" />
            <ProgressBar size="bar" stat={emotions} variant="Emotions" />
            <ProgressBar size="bar" stat={mind} variant="Mind" />
            <ProgressBar size="bar" stat={soul} variant="Soul" />
        </div>
    );
};

const mapStateToProps = state => ({
    energies: selectEnergies(state),
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = dispatch => ({
    setEnergies: value => dispatch(setEnergies(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Energies);
