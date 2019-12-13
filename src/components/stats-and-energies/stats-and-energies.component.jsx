import React from "react";
import { connect } from "react-redux";
// Styles
import "./stats-and-energies.styles.scss";
// SVG's
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";
// Actions
import { setBodyEnergy } from "../../redux/stats-and-energies/stats-and-energies.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const StatsAndEnergies = ({
    which,
    body,
    strength,
    emotions,
    creativity,
    mind,
    intelligence,
    soul,
    fluency,
}) => {
    return (
        <div className={which}>
            <ProgressBar
                barType="body"
                stat={which === "energies" ? body : strength}
                onClick={() => setBodyEnergy(50)}
            >
                {which === "energies" ? (
                    <Body className="icon" />
                ) : (
                    <Strength className="icon" />
                )}
            </ProgressBar>
            <ProgressBar
                barType="emotions"
                stat={which === "energies" ? emotions : creativity}
            >
                {which === "energies" ? (
                    <Emotions className="icon" />
                ) : (
                    <Creativity className="icon" />
                )}
            </ProgressBar>
            <ProgressBar
                barType="mind"
                stat={which === "energies" ? mind : intelligence}
            >
                {which === "energies" ? (
                    <Mind className="icon" />
                ) : (
                    <Intelligence className="icon" />
                )}
            </ProgressBar>
            <ProgressBar
                barType="soul"
                stat={which === "energies" ? soul : fluency}
            >
                {which === "energies" ? (
                    <Soul className="icon" />
                ) : (
                    <Fluency className="icon" />
                )}
            </ProgressBar>
        </div>
    );
};

const mapStateToProps = state => ({
    body: state.statsAndEnergies.body,
    strength: state.statsAndEnergies.strength,
    emotions: state.statsAndEnergies.emotions,
    creativity: state.statsAndEnergies.creativity,
    mind: state.statsAndEnergies.mind,
    intelligence: state.statsAndEnergies.intelligence,
    soul: state.statsAndEnergies.soul,
    fluency: state.statsAndEnergies.fluency,
});

const mapDispatchToProps = dispatch => ({
    setBodyEnergy: body => dispatch(setBodyEnergy(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsAndEnergies);
