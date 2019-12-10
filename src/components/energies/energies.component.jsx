import React from "react";
// Styles
import "./energies.styles.scss";

const Energies = () => {
    return (
        <div className="energies">
            <div className="energy-container">
                <div className="energy-icon"></div>
                <div className="progress">
                    <div className="bar body"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="energy-icon"></div>
                <div className="progress">
                    <div className="bar emotions"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="energy-icon"></div>
                <div className="progress">
                    <div className="bar mind"></div>
                </div>
            </div>

            <div className="energy-container">
                <div className="energy-icon"></div>
                <div className="progress">
                    <div className="bar soul"></div>
                </div>
            </div>
        </div>
    );
};

export default Energies;
