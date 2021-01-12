import { CONTROL_PANEL_WIDTH } from "App/constants";

import { makeStyles, Theme } from "@material-ui/core/styles";

const useBulletJournalStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        justifyContent: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
        height: "100%",
    },
    task: {
        backgroundColor: theme.palette.primary.dark,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        padding: "10px",
    },
    tabsWrapper: {
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    restWrapper: {
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
    tabsPlaceholder: {
        width: "161px",
        height: "877px",
    },
}));

export default useBulletJournalStyles;
