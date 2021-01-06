import { makeStyles, Theme } from "@material-ui/core/styles";

const useCustomDialogStyles = makeStyles((theme: Theme) => ({
    root: {},
    rootPaper: {
        backgroundColor: theme.palette.primary.main,
        minWidth: "30vw",
    },
    fixedHeightPaper: {
        minHeight: "73vh",
    },
    newFolderDialogBody: {
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    addProjectDialogContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    textDanger: {
        color: theme.palette.error.main,
    },
    actionsInContent: {
        padding: 0,
    },
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        justifyContent: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.contrastText,
        height: "73vh",
    },
    navTabs: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.dark,
    },
    newTimerDialogTitle: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    newTimerDialogForms: {
        padding: theme.spacing(3),
    },
}));

export default useCustomDialogStyles;
