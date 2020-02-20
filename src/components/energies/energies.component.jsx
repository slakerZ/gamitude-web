import React from "react";
import { connect } from "react-redux";
import { useDidUpdate } from "react-hooks-lib";
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

    useDidUpdate(() => {
        setEnergies({
            body: body - 5,
            emotions: emotions - 10,
            mind: mind - 15,
            soul: soul - 5,
        });
    }, [sessionsComplete]);

    return (
        <div className={classes.energies}>
            <ProgressBar stat={body} variant="Body" />
            <ProgressBar stat={emotions} variant="Emotions" />
            <ProgressBar stat={mind} variant="Mind" />
            <ProgressBar stat={soul} variant="Soul" />
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
