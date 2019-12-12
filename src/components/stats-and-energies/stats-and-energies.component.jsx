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

const StatsAndEnergies = ({ which, body }) => {
    const bodyStyle = {
        width: `${body}%`,
    };
    return (
        <div className={which}>
            <div className="container">
                <div className="progress">
                    {which === "energies" ? (
                        <Body className="icon" />
                    ) : (
                        <Strength className="icon" />
                    )}
                    <div className="bar body" style={bodyStyle}></div>
                </div>
            </div>

            <div className="container">
                <div className="progress">
                    {which === "energies" ? (
                        <Emotions className="icon" />
                    ) : (
                        <Creativity className="icon" />
                    )}
                    <div className="bar emotions"></div>
                </div>
            </div>

            <div className="container">
                <div className="progress">
                    {which === "energies" ? (
                        <Mind className="icon" />
                    ) : (
                        <Intelligence className="icon" />
                    )}
                    <div className="bar mind"></div>
                </div>
            </div>

            <div className="container">
                <div className="progress">
                    {which === "energies" ? (
                        <Soul className="icon" />
                    ) : (
                        <Fluency className="icon" />
                    )}
                    <div className="bar soul"></div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    body: state.statsAndEnergies.body,
});

export default connect(mapStateToProps)(StatsAndEnergies);
