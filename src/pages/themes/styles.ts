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
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    media: {
        height: 200,
    },
    shopFilters: {
        backgroundColor: theme.palette.primary.dark,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2),
        "& > *": {
            margin: theme.spacing(1),
        },
        minHeight: "100%",
    },
    shopFiltersBody: {
        position: "sticky",
        top: theme.spacing(3),
    },
    shopItems: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
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
    progress: {
        color: theme.palette.common.white,
    },
    center: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buyButton: {
        color: theme.palette.common.white,
    },
    pagination: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
}));

export default useThemesPageStyles;
