import { makeStyles, Theme } from "@material-ui/core/styles";

import { NAVIGATION_WIDTH, CONTROL_PANEL_WIDTH } from "./constants";

const useAppStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        width: "100vw",
        height: "100vh",
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: `${NAVIGATION_WIDTH}vw`,
        width: `calc(100vw - ${NAVIGATION_WIDTH}vw)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    left: {},
    center: {
        userSelect: "none",
    },
    right: {},
    content: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
    },
    title: {
        textDecoration: "none",
    },
    navDrawer: {
        width: `${NAVIGATION_WIDTH}vw`,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    navDrawerPaper: {
        backgroundColor: theme.palette.primary.main,
    },
    navDrawerOpen: {
        width: `${NAVIGATION_WIDTH}vw`,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    navDrawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",

        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    controlPanelDrawerPaper: {
        backgroundColor: theme.palette.primary.main,
        width: `${CONTROL_PANEL_WIDTH}vw`,
    },
    controlPanelDrawer: {
        width: `${CONTROL_PANEL_WIDTH}vw`,
    },
    controlPanelBody: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
}));

export default useAppStyles;
