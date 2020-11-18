import { CONTROL_PANEL_WIDTH } from "App/constants";

import { makeStyles, Theme } from "@material-ui/core/styles";

const useProjectsDesktopStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
    },
    appBar: {
        backgroundColor: "transparent",
    },
    tabsWrapper: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    tabsPlaceholder: {
        width: "161px",
        height: "877px",
    },
    tabs: {
        backgroundColor: theme.palette.secondary.main,
        justifyContent: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    projectsWrapper: {
        width: "100%",
    },
    fabWrapper: {
        position: "fixed",
        bottom: 0,
        right: `${CONTROL_PANEL_WIDTH}vw`,
        padding: theme.spacing(1.5),
    },
    add: {
        boxShadow: "5px 5px 10px #000000",
        backgroundColor: theme.palette.secondary.main,
    },
    addNewForm: {
        backgroundColor: theme.palette.primary.main,
    },

    center: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default useProjectsDesktopStyles;
