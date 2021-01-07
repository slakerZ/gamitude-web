import React from "react";
import { connect } from "react-redux";

import { selectSelectedProject } from "redux/projects/projects.selectors";
import { ReduxStateType } from "redux/root.reducer";
import {
    selectIsBreak,
    selectSessionInProgress,
} from "redux/session/session.selectors";
import { selectSelectedTimer } from "redux/timers/timers.selectors";

import LongBreakBadge from "./long-break-badge.component";
import LongBreakProgressBadge from "./long-break-progress-badge.component";
import OvertimeBadge from "./overtime-badge.component";
import ShortBreakBadge from "./short-break-badge.component";
import { TimerBadgedPropTypes } from "./types";

const TimerBadges = ({ children, handleOvertime }: TimerBadgedPropTypes) => {
    return (
        <LongBreakProgressBadge>
            <LongBreakBadge>
                <ShortBreakBadge>
                    <OvertimeBadge handleOvertime={handleOvertime}>
                        {children}
                    </OvertimeBadge>
                </ShortBreakBadge>
            </LongBreakBadge>
        </LongBreakProgressBadge>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    selectedProject: selectSelectedProject(state),
    sessionInProgress: selectSessionInProgress(state),
    selectedTimer: selectSelectedTimer(state),
    isBreak: selectIsBreak(state),
});

export default connect(mapStateToProps)(TimerBadges);
