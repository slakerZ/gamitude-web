import React, { useEffect } from "react";
import { connect } from "react-redux";
// Styles
import "./stats.styles.scss";
// Selectors
import { selectSessionsComplete } from "../../redux/projects/projects.selectors";

// Actions
import {
    setStrength,
    setCreativity,
    setIntelligence,
    setFluency,
} from "../../redux/stats/stats.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Stats = ({
    strength,
    creativity,
    intelligence,
    fluency,
    setStrength,
    setCreativity,
    setIntelligence,
    setFluency,
    sessionsComplete,
}) => {
    useEffect(() => {
        const updateEnergies = () => {
            if (sessionsComplete > 0) {
                // TODO: Mocked for REACT 25
                setStrength(strength + 0);
                setCreativity(creativity + 5);
                setIntelligence(intelligence + 10);
                setFluency(fluency + 0);
            }
        };
        updateEnergies();
        // eslint-disable-next-line
    }, [sessionsComplete]);
    return (
        <div className="stats">
            <ProgressBar variant="Strength" stat={strength} />
            <ProgressBar variant="Creativity" stat={creativity} />
            <ProgressBar variant="Intelligence" stat={intelligence} />
            <ProgressBar variant="Fluency" stat={fluency} />
        </div>
    );
};

const mapStateToProps = state => ({
    strength: state.stats.strength,
    creativity: state.stats.creativity,
    intelligence: state.stats.intelligence,
    fluency: state.stats.fluency,
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = dispatch => ({
    setStrength: value => dispatch(setStrength(value)),
    setCreativity: value => dispatch(setCreativity(value)),
    setIntelligence: value => dispatch(setIntelligence(value)),
    setFluency: value => dispatch(setFluency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
