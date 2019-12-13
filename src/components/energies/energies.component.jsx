import React from "react";
import { connect } from "react-redux";
// Styles
import "./energies.styles.scss";
// SVG's
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";
// Actions
import { setBody, setEmotions } from "../../redux/energies/energies.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Energies = ({ body, emotions, mind, soul, setBody, setEmotions }) => {
    return (
        <div className="energies">
            <ProgressBar barType="body" stat={body}>
                <Body className="icon" onClick={() => setBody(body - 10)} />
            </ProgressBar>
            <ProgressBar barType="emotions" stat={emotions}>
                <Emotions
                    className="icon"
                    onClick={() => setEmotions(emotions - 10)}
                />
            </ProgressBar>
            <ProgressBar barType="mind" stat={mind}>
                <Mind className="icon" />
            </ProgressBar>
            <ProgressBar barType="soul" stat={soul}>
                <Soul className="icon" />
            </ProgressBar>
        </div>
    );
};

const mapStateToProps = state => ({
    body: state.energies.body,
    emotions: state.energies.emotions,
    mind: state.energies.mind,
    soul: state.energies.soul,
});

const mapDispatchToProps = dispatch => ({
    setBody: value => dispatch(setBody(value)),
    setEmotions: value => dispatch(setEmotions(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Energies);
