import { LinkType } from "./types";

export const NAV_LINKS: LinkType[] = [
    {
        to: "/projects",
        label: "Projects",
        icon: "projects",
        tooltip: "projects",
    },
    {
        to: "/bulletJournal",
        label: "Bullet Journal",
        icon: "bulletJournal",
        tooltip: "bulletJournal",
    },
];

export const NAV_ACTIONS = [
    {
        to: "/profile",
        label: "Settings",
        icon: "profile",
        tooltip: "profileSettings",
    },
    {
        to: "/signInSignUp",
        label: "Logout",
        icon: "logout",
        tooltip: "logout",
    },
];

export const NAVIGATION_WIDTH = 12;

export const CONTROL_PANEL_WIDTH = 20;
