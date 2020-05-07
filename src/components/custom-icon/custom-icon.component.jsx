import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
// Tooltips
// Energies
import BodyTooltip from "../../tooltips/energies/body.tooltip.jsx";
import EmotionsTooltip from "../../tooltips/energies/emotions.tooltip.jsx";
import MindTooltip from "../../tooltips/energies/mind.tooltip.jsx";
import SoulTooltip from "../../tooltips/energies/soul.tooltip.jsx";
// Stats
import StrengthTooltip from "../../tooltips/stats/strength.tooltip.jsx";
import CreativityTooltip from "../../tooltips/stats/creativity.tooltip.jsx";
import IntelligenceTooltip from "../../tooltips/stats/intelligence.tooltip.jsx";
import FluencyTooltip from "../../tooltips/stats/fluency.tooltip.jsx";
// Projects
import ActiveIconTooltip from "../../tooltips/projects/active-icon.tooltip.jsx";
import PausedIconTooltip from "../../tooltips/projects/paused-icon.tooltip.jsx";
import DoneIconTooltip from "../../tooltips/projects/done-icon.tooltip.jsx";
// Menu
import ProjectsIconTooltip from "../../tooltips/menu/projects-icon.tooltip.jsx";
import BulletJournalIconTooltip from "../../tooltips/menu/bullet-journal-icon.tooltip.jsx";
import HomeIconTooltip from "../../tooltips/menu/home-icon.tooltip.jsx";
import ProfileIconTooltip from "../../tooltips/menu/profile-icon.tooltip.jsx";
import GuesIconTooltip from "../../tooltips/menu/guest-icon.tooltip.jsx";
// Mobile Menu
import ProjectNavIconTooltip from "../../tooltips/mobile-menu/project-nav-icon.tooltip.jsx";
import RankNavIconTooltip from "../../tooltips/mobile-menu/rank-nav-icon.tooltip.jsx";
import StatsNavIconTooltip from "../../tooltips/mobile-menu/stats-nav-icon.tooltip.jsx";
// Components
// Energies
import { ReactComponent as Body } from "../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../assets/icons/energies/soul.svg";
// Stats
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";
// Menu
import { ReactComponent as ProjectsIcon } from "../../assets/icons/navigation/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/navigation/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/navigation/sloth.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/navigation/profile.svg";
import { ReactComponent as GuestIcon } from "../../assets/icons/navigation/guest.svg";
// Projects
import { ReactComponent as ActiveIcon } from "../../assets/icons/projects/active.svg";
import { ReactComponent as PausedIcon } from "../../assets/icons/projects/onHold.svg";
import { ReactComponent as DoneIcon } from "../../assets/icons/projects/done.svg";
// Mobile Menu
import { ReactComponent as ProjectNav } from "../../assets/icons/navigation/project.svg";
import { ReactComponent as RankNav } from "../../assets/icons/navigation/rank.svg";
import { ReactComponent as StatsNav } from "../../assets/icons/navigation/stats.svg";

const CustomIcon = ({ variant, size }) => {
    const useStyles = makeStyles(theme => ({
        error: {
            backgroundColor: theme.palette.error.contrastText,
        },
        small: {
            width: "4vh",
            height: "4vh",
        },
        medium: {
            width: "5vh",
            height: "5vh",
        },
        large: {
            width: "6vh",
            height: "6vh",
        },
        bar: {
            width: "60px",
            height: "60px",
            float: "left",
            padding: "7px",
            "&::after": {
                clear: "both",
            },
        },
    }));
    const classes = useStyles();

    const setClass = size => {
        switch (size) {
            case "bar":
                return classes.bar;
            case "small":
                return classes.small;
            case "medium":
                return classes.medium;
            case "large":
                return classes.large;
            default:
                return classes.error;
        }
    };

    const getIcon = (variant, size) => {
        switch (variant) {
            case "body":
                return (
                    <Tooltip title={<BodyTooltip />}>
                        <Body className={setClass(size)} />
                    </Tooltip>
                );
            case "emotions":
                return (
                    <Tooltip title={<EmotionsTooltip />}>
                        <Emotions className={setClass(size)} />
                    </Tooltip>
                );
            case "mind":
                return (
                    <Tooltip title={<MindTooltip />}>
                        <Mind className={setClass(size)} />
                    </Tooltip>
                );
            case "soul":
                return (
                    <Tooltip title={<SoulTooltip />}>
                        <Soul className={setClass(size)} />
                    </Tooltip>
                );
            case "strength":
                return (
                    <Tooltip title={<StrengthTooltip />}>
                        <Strength className={setClass(size)} />
                    </Tooltip>
                );
            case "creativity":
                return (
                    <Tooltip title={<CreativityTooltip />}>
                        <Creativity className={setClass(size)} />
                    </Tooltip>
                );
            case "intelligence":
                return (
                    <Tooltip title={<IntelligenceTooltip />}>
                        <Intelligence className={setClass(size)} />
                    </Tooltip>
                );
            case "fluency":
                return (
                    <Tooltip title={<FluencyTooltip />}>
                        <Fluency className={setClass(size)} />
                    </Tooltip>
                );
            case "projects":
                return (
                    <Tooltip title={<ProjectsIconTooltip />}>
                        <ProjectsIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "bulletJournal":
                return (
                    <Tooltip title={<BulletJournalIconTooltip />}>
                        <BulletJournalIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "logo":
                return (
                    <Tooltip title={<HomeIconTooltip />}>
                        <Logo className={setClass(size)} />
                    </Tooltip>
                );
            case "profile":
                return (
                    <Tooltip title={<ProfileIconTooltip />}>
                        <ProfileIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "guest":
                return (
                    <Tooltip title={<GuesIconTooltip />}>
                        <GuestIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "active":
                return (
                    <Tooltip title={<ActiveIconTooltip />}>
                        <ActiveIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "paused":
                return (
                    <Tooltip title={<PausedIconTooltip />}>
                        <PausedIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "done":
                return (
                    <Tooltip title={<DoneIconTooltip />}>
                        <DoneIcon className={setClass(size)} />
                    </Tooltip>
                );
            case "rankNav":
                return (
                    <Tooltip title={<RankNavIconTooltip />}>
                        <RankNav className={setClass(size)} />
                    </Tooltip>
                );
            case "statsNav":
                return (
                    <Tooltip title={<StatsNavIconTooltip />}>
                        <StatsNav className={setClass(size)} />
                    </Tooltip>
                );
            case "projectsNav":
                return (
                    <Tooltip title={<ProjectNavIconTooltip />}>
                        <ProjectNav className={setClass(size)} />
                    </Tooltip>
                );
            default:
                return <div>Icon not found</div>;
        }
    };

    return getIcon(variant, size);
};

export default CustomIcon;
