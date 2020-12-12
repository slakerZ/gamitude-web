import { ReactComponent as Body } from "assets/icons/energies/body.svg";
import { ReactComponent as Emotions } from "assets/icons/energies/emotions.svg";
import { ReactComponent as Mind } from "assets/icons/energies/mind.svg";
import { ReactComponent as Soul } from "assets/icons/energies/soul.svg";
import { ReactComponent as GuestIcon } from "assets/icons/navigation/guest.svg";
import { ReactComponent as BulletJournalIcon } from "assets/icons/navigation/journal.svg";
import { ReactComponent as Logout } from "assets/icons/navigation/logout.svg";
import { ReactComponent as ProfileIcon } from "assets/icons/navigation/profile.svg";
import { ReactComponent as ProjectsIcon } from "assets/icons/navigation/projects.svg";
import { ReactComponent as Settings } from "assets/icons/navigation/settings.svg";
import { ReactComponent as Logo } from "assets/icons/navigation/sloth.svg";
import { ReactComponent as Themes } from "assets/icons/navigation/themes.svg";
import { ReactComponent as TooltipChecked } from "assets/icons/navigation/tooltip_checked.svg";
import { ReactComponent as TooltipUnChecked } from "assets/icons/navigation/tooltip_unchecked.svg";
import { ReactComponent as GitHub } from "assets/icons/other/github.svg";
import { ReactComponent as NotFound } from "assets/icons/other/page-not-found.svg";
import { ReactComponent as ActiveIcon } from "assets/icons/projects/active.svg";
import { ReactComponent as Countdown } from "assets/icons/projects/countdown.svg";
import { ReactComponent as DoneIcon } from "assets/icons/projects/done.svg";
import { ReactComponent as PausedIcon } from "assets/icons/projects/onHold.svg";
import { ReactComponent as Stopwatch } from "assets/icons/projects/stopwatch.svg";
import { ReactComponent as ARank } from "assets/icons/rank-tiers/001-letter-a.svg";
import { ReactComponent as BRank } from "assets/icons/rank-tiers/002-letter-b.svg";
import { ReactComponent as CRank } from "assets/icons/rank-tiers/003-letter-c.svg";
import { ReactComponent as DRank } from "assets/icons/rank-tiers/004-letter-d.svg";
import { ReactComponent as ERank } from "assets/icons/rank-tiers/005-letter-e.svg";
import { ReactComponent as FRank } from "assets/icons/rank-tiers/006-letter-f.svg";
import { ReactComponent as SRank } from "assets/icons/rank-tiers/019-letter-s.svg";
import { ReactComponent as Creativity } from "assets/icons/stats/creativity.svg";
import { ReactComponent as Fluency } from "assets/icons/stats/fluency.svg";
import { ReactComponent as Intelligence } from "assets/icons/stats/intelligence.svg";
import { ReactComponent as Money } from "assets/icons/stats/money.svg";
import { ReactComponent as Strength } from "assets/icons/stats/strength.svg";
import clsx from "clsx";

import React, { ReactElement, FC } from "react";

import useCustomIconStyles from "./styles";
import { CustomIconType } from "./types";

const CustomIcon: FC<CustomIconType> = ({
    variant,
    size,
}: CustomIconType): ReactElement => {
    const classes = useCustomIconStyles();

    const getIcon = (variant: string, size: string) => {
        const variantLowered = variant ? variant.toLowerCase() : "";
        const mappedClasses = clsx(classes.white, {
            [classes.xsmall]: size === "xsmall",
            [classes.small]: size === "small",
            [classes.medium]: size === "medium",
            [classes.large]: size === "large",
            [classes.avatar]: size === "avatar",
        });
        switch (variantLowered) {
            case "body":
                return <Body className={mappedClasses} />;
            case "emotions":
                return <Emotions className={mappedClasses} />;
            case "mind":
                return <Mind className={mappedClasses} />;
            case "soul":
                return <Soul className={mappedClasses} />;
            case "strength":
                return <Strength className={mappedClasses} />;
            case "creativity":
                return <Creativity className={mappedClasses} />;
            case "intelligence":
                return <Intelligence className={mappedClasses} />;
            case "fluency":
                return <Fluency className={mappedClasses} />;
            case "money":
                return <Money className={mappedClasses} />;
            case "projects":
                return <ProjectsIcon className={mappedClasses} />;
            case "bulletjournal":
                return <BulletJournalIcon className={mappedClasses} />;
            case "logo":
                return <Logo className={mappedClasses} />;
            case "profile":
                return <ProfileIcon className={mappedClasses} />;
            case "guest":
                return <GuestIcon className={mappedClasses} />;
            case "active":
                return <ActiveIcon className={mappedClasses} />;
            case "paused":
                return <PausedIcon className={mappedClasses} />;
            case "done":
                return <DoneIcon className={mappedClasses} />;
            case "logout":
                return <Logout className={mappedClasses} />;
            case "settings":
                return <Settings className={mappedClasses} />;
            case "tooltip_checked":
                return <TooltipChecked className={mappedClasses} />;
            case "tooltip_unchecked":
                return <TooltipUnChecked className={mappedClasses} />;
            case "themes":
                return <Themes className={mappedClasses} />;
            case "f":
                return <FRank className={mappedClasses} />;
            case "e":
                return <ERank className={mappedClasses} />;
            case "d":
                return <DRank className={mappedClasses} />;
            case "c":
                return <CRank className={mappedClasses} />;
            case "b":
                return <BRank className={mappedClasses} />;
            case "a":
                return <ARank className={mappedClasses} />;
            case "s":
                return <SRank className={mappedClasses} />;
            case "stopwatch":
                return <Stopwatch className={mappedClasses} />;
            case "countdown":
                return <Countdown className={mappedClasses} />;
            case "github":
                return <GitHub className={mappedClasses} />;
            default:
                return <NotFound className={mappedClasses} />;
        }
    };

    return getIcon(variant, size);
};

export default CustomIcon;
