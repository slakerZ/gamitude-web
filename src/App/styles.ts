import { makeStyles, Theme } from "@material-ui/core/styles";
import { NAVIGATION_WIDTH, CONTROL_PANEL_WIDTH } from "./constants";

const useAppStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        width: "100vw",
        height: "100vh",
        display: "flex",
    },
    appBar: {},
    appBarShift: {},
    center: {},
    content: {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
    },
    homePage: {},
    navDrawer: {
        width: NAVIGATION_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    navDrawerPaper: {
        backgroundColor: theme.palette.primary.main,
    },
    navDrawerOpen: {
        width: NAVIGATION_WIDTH,
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
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    controlPanelDrawerPaper: {
        backgroundColor: theme.palette.primary.main,
        width: CONTROL_PANEL_WIDTH,
    },
    controlPanelDrawer: {
        width: CONTROL_PANEL_WIDTH,
    },
}));

export default useAppStyles;
