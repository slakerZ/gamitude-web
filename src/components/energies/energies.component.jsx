import React, { useEffect } from "react";
import { connect } from "react-redux";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
// SVG's
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";
// Selectors
import { selectSessionsComplete } from "../../redux/projects/projects.selectors";
// Actions
import {
    setBody,
    setEmotions,
    setMind,
    setSoul,
} from "../../redux/energies/energies.actions.js";
// Components
import ProgressBar from "../progress-bar/progress-bar.component.jsx";

const Energies = ({
    body,
    emotions,
    mind,
    soul,
    setBody,
    setEmotions,
    setMind,
    setSoul,
    sessionsComplete,
}) => {
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

    useEffect(() => {
        const updateEnergies = () => {
            if (sessionsComplete > 0) {
                // TODO: Mocked for REACT 25
                setBody(body - 5);
                setEmotions(emotions - 10);
                setMind(mind - 15);
                setSoul(soul - 5);
            }
        };
        updateEnergies();
        // eslint-disable-next-line
    }, [sessionsComplete]);

    return (
        <div className={classes.energies}>
            <ProgressBar barType="body" stat={body}>
                <Body className="icon" />
            </ProgressBar>
            <ProgressBar barType="emotions" stat={emotions}>
                <Emotions className="icon" />
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
    sessionsComplete: selectSessionsComplete(state),
});

const mapDispatchToProps = dispatch => ({
    setBody: value => dispatch(setBody(value)),
    setEmotions: value => dispatch(setEmotions(value)),
    setMind: value => dispatch(setMind(value)),
    setSoul: value => dispatch(setSoul(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Energies);
