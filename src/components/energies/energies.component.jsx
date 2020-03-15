import React from "react";
import { connect } from "react-redux";
import { useUpdateEffect } from "react-use";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// Selectors
import { selectEnergies } from "../../redux/energies/energies.selectors";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Energies = ({ energies }) => {
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
    useUpdateEffect(() => {}, [body, emotions, mind, soul]);

    return (
        <div className={classes.energies}>
            <ProgressBar size="bar" stat={body} variant="body" />
            <ProgressBar size="bar" stat={emotions} variant="emotions" />
            <ProgressBar size="bar" stat={mind} variant="mind" />
            <ProgressBar size="bar" stat={soul} variant="soul" />
        </div>
    );
};

const mapStateToProps = state => ({
    energies: selectEnergies(state),
});

export default connect(mapStateToProps)(Energies);
