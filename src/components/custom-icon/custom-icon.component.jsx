import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core";
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
                return <Body className={setClass(size)} />;
            case "emotions":
                return <Emotions className={setClass(size)} />;
            case "mind":
                return <Mind className={setClass(size)} />;
            case "soul":
                return <Soul className={setClass(size)} />;
            case "strength":
                return <Strength className={setClass(size)} />;
            case "creativity":
                return <Creativity className={setClass(size)} />;
            case "intelligence":
                return <Intelligence className={setClass(size)} />;
            case "fluency":
                return <Fluency className={setClass(size)} />;
            case "projects":
                return <ProjectsIcon className={setClass(size)} />;
            case "bulletJournal":
                return <BulletJournalIcon className={setClass(size)} />;
            case "logo":
                return <Logo className={setClass(size)} />;
            case "profile":
                return <ProfileIcon className={setClass(size)} />;
            case "guest":
                return <GuestIcon className={setClass(size)} />;
            case "active":
                return <ActiveIcon className={setClass(size)} />;
            case "paused":
                return <PausedIcon className={setClass(size)} />;
            case "done":
                return <DoneIcon className={setClass(size)} />;
            case "rankNav":
                return <RankNav className={setClass(size)} />;
            case "statsNav":
                return <StatsNav className={setClass(size)} />;
            case "projectsNav":
                return <ProjectNav className={setClass(size)} />;
            default:
                return <div>Icon not found</div>;
        }
    };

    return getIcon(variant, size);
};

export default CustomIcon;
