import { makeStyles, Theme } from "@material-ui/core/styles";

import { NAVIGATION_WIDTH, CONTROL_PANEL_WIDTH } from "./constants";

const useAppStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    },
    rootFlex: {
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
    appBarTransparent: {
        backgroundColor: "transparent",
        boxShadow: "none",
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
    floatingDrawerPaper: {
        backgroundColor: "transparent",
        border: "none",
        zIndex: 200,
    },
    transparentList: {
        backgroundColor: "transparent",
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
        width: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
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
    navigationLeft: {
        overflowX: "hidden",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    timerPlaceholder: {
        height: 240,
        width: "100%",
    },
    timerListPlaceholder: {
        height: 80,
        width: "100%",
    },
}));

export default useAppStyles;
