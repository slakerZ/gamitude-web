import React, { Fragment, ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useAsyncFn } from "react-use";

import IconButton from "@material-ui/core/IconButton";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import {
    setAddProjectDialogOpen,
    setFoldersSettingsDialogOpen,
    setTimerSettingsDialogOpen,
} from "redux/dialogs/dialogs.actions";
import { setSelectedFolderById } from "redux/folders/folders.actions";
import { selectFolders } from "redux/folders/folders.selectors";
import { setSelectedProjectById } from "redux/projects/projects.actions";
import { selectProjects } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import { setSnackbarState } from "redux/snackbar/snackbar.actions";
import { selectOpen } from "redux/snackbar/snackbar.selectors";
import { SnackbarStateType } from "redux/snackbar/snackbar.types";
import { setSelectedTimerById } from "redux/timers/timers.actions";
import { selectTimers } from "redux/timers/timers.selectors";

import { ProjectType } from "api/projects/types";
import { postPredict } from "api/voiceRecognition/voiceRecognition.api";

import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import { SUPPORTED_LOCATIONS, SUPPORTED_DIALOGS } from "./constants";
import {
    VoiceCommandManagerPropTypes,
    VoiceCommandType,
    TargetType,
} from "./types";

const VoiceCommandManager = ({
    setSnackbarState,
    setAddProjectDialogOpen,
    setFoldersSettingsDialogOpen,
    setTimerSettingsDialogOpen,
    snackBarOpen,
    setSelectedFolderById,
    setSelectedProjectById,
    setSelectedTimerById,
    folders,
    timers,
    projects,
}: VoiceCommandManagerPropTypes): ReactElement | null => {
    const [makePredictionState, makePrediction] = useAsyncFn(
        async (command: string) => {
            const requestBody = {
                command: command,
                entities: {
                    projects: projects,
                    folders: folders,
                    timers: timers,
                },
            };
            const result = await postPredict(requestBody);
            handleVoiceCommands(
                result.command,
                result.target_id,
                result.target,
            );
            resetTranscript();
            return result;
        },
        [projects, folders, timers],
    );

    const location = useLocation();
    const speechAPIAvailable = SpeechRecognition.browserSupportsSpeechRecognition();
    const allowSpeechRecognition = SUPPORTED_LOCATIONS.includes(
        location.pathname,
    );

    // Voice recognition
    const commands = [
        {
            command: "listen * (please)",
            callback: makePrediction,
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

    const handleVoiceCommands = (
        command: VoiceCommandType,
        target_id: string,
        target: TargetType,
    ) => {
        switch (command) {
            case "select timer":
                setSelectedTimerById(target_id);
                break;
            case "select project":
                setSelectedFolderById((target as ProjectType).folderId);
                setSelectedProjectById(target_id);
                break;
            case "select folder":
                setSelectedFolderById(target_id);
                break;
            default:
                break;
        }
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
        if (makePredictionState.error) {
            setSnackbarState({
                message: "Failed to understand command",
                severity: "error",
                autoHideDuration: null,
                open: true,
            });
            resetTranscript();
        }
    }, [makePredictionState, setSnackbarState, resetTranscript]);

    return speechAPIAvailable && allowSpeechRecognition ? (
        <Fragment>
            <ToggleableTooltip target="voiceRecognition">
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
            </ToggleableTooltip>
        </Fragment>
    ) : null;
};

const mapStateToProps = (state: ReduxStateType) => ({
    snackBarOpen: selectOpen(state),
    projects: selectProjects(state),
    timers: selectTimers(state),
    folders: selectFolders(state),
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
