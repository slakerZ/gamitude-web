import { makeStyles } from "@material-ui/core/styles";

const useThemesPageStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        overflowX: "hidden",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    media: {
        height: 200,
    },
    shopFilter: {
        backgroundColor: theme.palette.primary.main,
    },
    shopItems: {
        padding: theme.spacing(2, 4, 2, 2),
        backgroundColor: theme.palette.primary.light,
    },
    flexRow: {
        display: "flex",
        justifyContent: "space-between",
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
}));

export default useThemesPageStyles;
