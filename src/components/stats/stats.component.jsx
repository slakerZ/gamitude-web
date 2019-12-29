import React from "react";
import { connect } from "react-redux";
// Styles
import "./stats.styles.scss";
// Actions
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";
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
}) => {
    return (
        <div className="stats">
            <ProgressBar barType="strength" stat={strength}>
                <Strength
                    className="icon"
                    onClick={() => setStrength(strength + 5)}
                />
            </ProgressBar>
            <ProgressBar barType="creativity" stat={creativity}>
                <Creativity
                    className="icon"
                    onClick={() => setCreativity(creativity + 5)}
                />
            </ProgressBar>
            <ProgressBar barType="intelligence" stat={intelligence}>
                <Intelligence
                    className="icon"
                    onClick={() => setIntelligence(intelligence + 5)}
                />
            </ProgressBar>
            <ProgressBar barType="fluency" stat={fluency}>
                <Fluency
                    className="icon"
                    onClick={() => setFluency(fluency + 5)}
                />
            </ProgressBar>
        </div>
    );
};

const mapStateToProps = state => ({
    strength: state.stats.strength,
    creativity: state.stats.creativity,
    intelligence: state.stats.intelligence,
    fluency: state.stats.fluency,
});

const mapDispatchToProps = dispatch => ({
    setStrength: value => dispatch(setStrength(value)),
    setCreativity: value => dispatch(setCreativity(value)),
    setIntelligence: value => dispatch(setIntelligence(value)),
    setFluency: value => dispatch(setFluency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
