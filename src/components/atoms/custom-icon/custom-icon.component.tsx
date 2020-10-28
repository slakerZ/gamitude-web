import React, { ReactElement, FC } from "react";
import clsx from "clsx";
// Energies
import { ReactComponent as Body } from "../../../assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "../../../assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "../../../assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "../../../assets/icons/energies/soul.svg";
// Stats
import { ReactComponent as Strength } from "../../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../../assets/icons/stats/fluency.svg";
// Menu
import { ReactComponent as ProjectsIcon } from "../../../assets/icons/navigation/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../../assets/icons/navigation/journal.svg";
import { ReactComponent as Logo } from "../../../assets/icons/navigation/sloth.svg";
import { ReactComponent as ProfileIcon } from "../../../assets/icons/navigation/profile.svg";
import { ReactComponent as GuestIcon } from "../../../assets/icons/navigation/guest.svg";
// Projects
import { ReactComponent as ActiveIcon } from "../../../assets/icons/projects/active.svg";
import { ReactComponent as PausedIcon } from "../../../assets/icons/projects/onHold.svg";
import { ReactComponent as DoneIcon } from "../../../assets/icons/projects/done.svg";
// Mobile Menu
import { ReactComponent as ProjectNav } from "../../../assets/icons/navigation/project.svg";
import { ReactComponent as RankNav } from "../../../assets/icons/navigation/rank.svg";
import { ReactComponent as StatsNav } from "../../../assets/icons/navigation/stats.svg";
// Ranks
import { ReactComponent as FRank } from "../../../assets/icons/rank-tiers/006-letter-f.svg";
import { ReactComponent as ERank } from "../../../assets/icons/rank-tiers/005-letter-e.svg";
import { ReactComponent as DRank } from "../../../assets/icons/rank-tiers/004-letter-d.svg";
import { ReactComponent as CRank } from "../../../assets/icons/rank-tiers/003-letter-c.svg";
import { ReactComponent as BRank } from "../../../assets/icons/rank-tiers/002-letter-b.svg";
import { ReactComponent as ARank } from "../../../assets/icons/rank-tiers/001-letter-a.svg";
import { ReactComponent as SRank } from "../../../assets/icons/rank-tiers/019-letter-s.svg";

// Other
import { ReactComponent as NotFound } from "../../../assets/icons/other/page-not-found.svg";

// Local
import useCustomIconStyles from "./styles";
import { CustomIconType } from "./types";

const CustomIcon: FC<CustomIconType> = ({
    variant,
    size,
}: CustomIconType): ReactElement => {
    const classes = useCustomIconStyles();

    // TODO: probably job for clsx
    const setClass = (size: string) => {
        switch (size) {
            case "bar":
                return classes.bar;
            case "small":
                return classes.small;
            case "medium":
                return classes.medium;
            case "large":
                return classes.large;
            case "avatar":
                return classes.avatar;
            default:
                return classes.error;
        }
    };

    const getIcon = (variant: string, size: string) => {
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
                return (
                    <ProjectsIcon
                        className={clsx(setClass(size), classes.white)}
                    />
                );
            case "bulletJournal":
                return (
                    <BulletJournalIcon
                        className={clsx(setClass(size), classes.white)}
                    />
                );
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
            case "f":
                return <FRank className={setClass(size)} />;
            case "e":
                return <ERank className={setClass(size)} />;
            case "d":
                return <DRank className={setClass(size)} />;
            case "c":
                return <CRank className={setClass(size)} />;
            case "b":
                return <BRank className={setClass(size)} />;
            case "a":
                return <ARank className={setClass(size)} />;
            case "s":
                return <SRank className={setClass(size)} />;
            default:
                return <NotFound className={setClass(size)} />;
        }
    };

    return getIcon(variant, size);
};

export default CustomIcon;
