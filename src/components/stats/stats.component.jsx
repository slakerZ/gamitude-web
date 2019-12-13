import React from "react";
// Styles
import "./stats.styles.scss";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Stats = (strength, creativity, intelligence, fluency) => {
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

export default Stats;
