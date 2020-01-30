import React, { useEffect } from "react";
import { connect } from "react-redux";
// Styles
import "./stats.styles.scss";
// Selectors
import { selectSessionsComplete } from "../../redux/projects/projects.selectors";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";
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
    }, [sessionsComplete]);
    return (
        <div className="stats">
            <ProgressBar barType="strength" stat={strength}>
                <Strength className="icon" />
            </ProgressBar>
            <ProgressBar barType="creativity" stat={creativity}>
                <Creativity className="icon" />
            </ProgressBar>
            <ProgressBar barType="intelligence" stat={intelligence}>
                <Intelligence className="icon" />
            </ProgressBar>
            <ProgressBar barType="fluency" stat={fluency}>
                <Fluency className="icon" />
            </ProgressBar>
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
