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
        minHeight: "65vh",
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
    editedTimerSelectContainer: {
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    editedTimerSelect: {
        margin: theme.spacing(1),
        color: theme.palette.secondary.main,
        textAlign: "center",
        "& .MuiSelect-icon": {
            color: theme.palette.secondary.main,
        },
    },
    delButtonWrapper: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.primary.dark,
    },
    delButton: {
        backgroundColor: theme.palette.error.main,
        margin: theme.spacing(1),
    },
    delButtonTypo: {
        color: theme.palette.primary.dark,
    },
}));

export default useCustomDialogStyles;
