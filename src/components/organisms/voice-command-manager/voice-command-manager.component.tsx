import React, { Fragment, ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { SnackbarStateType } from "redux/snackbar/snackbar.types";

import { SUPPORTED_LOCATIONS } from "./constants";
import { VoiceCommandManagerPropTypes } from "./types";

const VoiceCommandManager = ({
    setSnackbarState,
}: VoiceCommandManagerPropTypes): ReactElement | null => {
    const location = useLocation();

    const speechAPIAvailable = SpeechRecognition.browserSupportsSpeechRecognition();
    const allowSpeechRecognition = SUPPORTED_LOCATIONS.includes(
        location.pathname,
    );

    // Voice recognition
    const commands = [
        {
            command: "reset",
            callback: () => resetTranscript(),
        },
        {
            command: "stop (listening)",
            callback: SpeechRecognition.stopListening,
        },
    ];
    const { transcript, listening, resetTranscript } = useSpeechRecognition({
        commands,
    });

    //handlers
    const handleVoiceManagerOnOff = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({
                continuous: true,
                language: "en-US",
            });
        }
    };

    // useEffect
    useEffect(() => {
        if (transcript) {
            setSnackbarState({
                message: transcript,
                severity: "info",
                autoHideDuration: 3000,
                open: true,
            });
        }
    }, [transcript, setSnackbarState]);

    return speechAPIAvailable && allowSpeechRecognition ? (
        <Fragment>
            <IconButton
                aria-label="turn voice command manager on/off"
                size="small"
                onClick={handleVoiceManagerOnOff}
            >
                {listening ? (
                    <MicOffIcon fontSize="inherit" />
                ) : (
                    <MicIcon fontSize="inherit" />
                )}
            </IconButton>
        </Fragment>
    ) : null;
};

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: SnackbarStateType) =>
        dispatch(setSnackbarState(value)),
});

export default connect(null, mapDispatchToProps)(VoiceCommandManager);
