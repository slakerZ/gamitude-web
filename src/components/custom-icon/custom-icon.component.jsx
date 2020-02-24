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
            case "Body":
                return <Body className={setClass(size)} />;
            case "Emotions":
                return <Emotions className={setClass(size)} />;
            case "Mind":
                return <Mind className={setClass(size)} />;
            case "Soul":
                return <Soul className={setClass(size)} />;
            case "Strength":
                return <Strength className={setClass(size)} />;
            case "Creativity":
                return <Creativity className={setClass(size)} />;
            case "Intelligence":
                return <Intelligence className={setClass(size)} />;
            case "Fluency":
                return <Fluency className={setClass(size)} />;
            case "Projects":
                return <ProjectsIcon className={setClass(size)} />;
            case "BulletJournal":
                return <BulletJournalIcon className={setClass(size)} />;
            case "Logo":
                return <Logo className={setClass(size)} />;
            case "Profile":
                return <ProfileIcon className={setClass(size)} />;
            case "Guest":
                return <GuestIcon className={setClass(size)} />;
            case "Active":
                return <ActiveIcon className={setClass(size)} />;
            case "Paused":
                return <PausedIcon className={setClass(size)} />;
            case "Done":
                return <DoneIcon className={setClass(size)} />;
            default:
                return <div>Icon not found</div>;
        }
    };

    return getIcon(variant, size);
};

export default CustomIcon;
