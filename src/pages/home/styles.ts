import { makeStyles, Theme } from "@material-ui/core/styles";

const useHomePageStyles = makeStyles((theme: Theme) => ({
    root: {},
    fab: {
        position: "fixed",
        top: theme.spacing(2),
        right: theme.spacing(2),
        backgroundColor: "rgba(0,0,0, 0.6)",
        zIndex: 2000,
    },
    video: {
        height: "100vh",
        width: "100vw",
        position: "absolute",
    },
    banner: {
        height: "100vh",
        width: "100vw",
        position: "relative",
    },
    subTitle: {
        textDecoration: "underline",
    },
    centered: {
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    flexColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0, 0.6)",
        border: "1px solid black",
        padding: theme.spacing(3, 14),
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.6,
        filter: "blur(10px)",
    },
    button: {},
}));

export default useHomePageStyles;
