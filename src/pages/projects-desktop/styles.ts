import { makeStyles, Theme } from "@material-ui/core/styles";
import { CONTROL_PANEL_WIDTH } from "../../App/constants";

const useProjectsDesktopStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
    appBar: {
        backgroundColor: "transparent",
    },
    tabsWrapper: {
        height: "100%",
        backgroundColor: theme.palette.secondary.main,
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
}));

export default useProjectsDesktopStyles;
