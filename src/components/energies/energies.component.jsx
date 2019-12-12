import React from "react";
// Styles
import "./energies.styles.scss";
// SVG's
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";

const Energies = () => {
    return (
        <div className="energies">
            <div className="energy-container">
                <div className="progress">
                    <Body className="energy-icon" />
                    <div className="bar body"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="progress">
                    <Emotions className="energy-icon" />
                    <div className="bar emotions"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="progress">
                    <Mind className="energy-icon" />
                    <div className="bar mind"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="progress">
                    <Soul className="energy-icon" />
                    <div className="bar soul"></div>
                </div>
            </div>
        </div>
    );
};

export default Energies;
