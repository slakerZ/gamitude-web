import { makeStyles, Theme } from "@material-ui/core/styles";

const useProfilePageStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        height: "100%",
    },
    tabsWrapper: {
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "sticky",
        top: 0,
    },
    tabs: {
        backgroundColor: theme.palette.primary.dark,
        justifyContent: "center",
        borderRight: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.contrastText,
    },
    tab: {
        color: theme.palette.primary.contrastText,
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dngButton: {
        backgroundColor: theme.palette.error.main,
        width: "100%",
    },
}));

export default useProfilePageStyles;
