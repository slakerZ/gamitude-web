import React, { Fragment, ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import {
    setAddProjectDialogOpen,
    setFoldersSettingsDialogOpen,
    setTimerSettingsDialogOpen,
} from "redux/dialogs/dialogs.actions";
import { setSelectedFolderById } from "redux/folders/folders.actions";
import { setSelectedProjectById } from "redux/projects/projects.actions";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectOpen } from "redux/snackbar/snackbar.selectors";
import { SnackbarStateType } from "redux/snackbar/snackbar.types";
import { setSelectedTimerById } from "redux/timers/timers.actions";

import { SUPPORTED_LOCATIONS, SUPPORTED_DIALOGS } from "./constants";
import { VoiceCommandManagerPropTypes } from "./types";

const VoiceCommandManager = ({
    setSnackbarState,
    setAddProjectDialogOpen,
    setFoldersSettingsDialogOpen,
    setTimerSettingsDialogOpen,
    snackBarOpen,
    setSelectedFolderById,
    setSelectedProjectById,
    setSelectedTimerById,
}: VoiceCommandManagerPropTypes): ReactElement | null => {
    const location = useLocation();

    const speechAPIAvailable = SpeechRecognition.browserSupportsSpeechRecognition();
    const allowSpeechRecognition = SUPPORTED_LOCATIONS.includes(
        location.pathname,
    );

    // Voice recognition
    const commands = [
        {
            command: "command *",
            callback: (command: string) => handleAPICommands(command),
        },
        {
            command: "project :projectName",
            callback: (projectName: string) =>
                setSelectedProjectById("5fd7704e633fc5a539c9a989"),
        },
        {
            command: "folder :folderName",
            callback: (folderName: string) =>
                setSelectedFolderById("5fd7704e633fc5a539c9a985"),
        },
        {
            command: "timer :timerName",
            callback: (timerName: string) =>
                setSelectedTimerById("5fd7704e633fc5a539c9a98b"),
        },
        {
            command: "open :dialogName",
            callback: (dialogName: string) =>
                handleOpenDialogs(dialogName, true),
        },
        {
            command: "close :dialogName",
            callback: (dialogName: string) =>
                handleOpenDialogs(dialogName, false),
        },
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
    const handleAPICommands = (command: string) => {
        console.log(command);
        resetTranscript();
    };

    const handleOpenDialogs = (dialogName: string, open: boolean) => {
        if (SUPPORTED_DIALOGS.includes(dialogName.toLowerCase())) {
            switch (dialogName.toLowerCase()) {
                case "projects":
                case "project":
                    setAddProjectDialogOpen(open);
                    break;
                case "folders":
                    setFoldersSettingsDialogOpen(open);
                    break;
                case "timers":
                    setTimerSettingsDialogOpen(open);
                    break;
                default:
                    break;
            }
        }
        resetTranscript();
    };

    const handleVoiceManagerOnOff = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
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

    useEffect(() => {
        if (!snackBarOpen) {
            resetTranscript();
        }
    }, [snackBarOpen, resetTranscript]);

    return speechAPIAvailable && allowSpeechRecognition ? (
        <Fragment>
            <IconButton
                aria-label="turn voice command manager on/off"
                size="small"
                onClick={handleVoiceManagerOnOff}
            >
                {listening ? (
                    <MicIcon fontSize="inherit" />
                ) : (
                    <MicOffIcon fontSize="inherit" />
                )}
            </IconButton>
        </Fragment>
    ) : null;
};

const mapStateToProps = (state: ReduxStateType) => ({
    snackBarOpen: selectOpen(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbarState: (value: SnackbarStateType) =>
        dispatch(setSnackbarState(value)),
    setAddProjectDialogOpen: (value: boolean) =>
        dispatch(setAddProjectDialogOpen(value)),
    setFoldersSettingsDialogOpen: (value: boolean) =>
        dispatch(setFoldersSettingsDialogOpen(value)),
    setTimerSettingsDialogOpen: (value: boolean) =>
        dispatch(setTimerSettingsDialogOpen(value)),
    setSelectedFolderById: (value: any) =>
        dispatch(setSelectedFolderById(value)),
    setSelectedProjectById: (value: any) =>
        dispatch(setSelectedProjectById(value)),
    setSelectedTimerById: (value: string) =>
        dispatch(setSelectedTimerById(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(VoiceCommandManager);
