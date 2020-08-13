import { makeStyles } from "@material-ui/core/styles";

const useAppStyles = makeStyles((theme) => ({
    app: {
        backgroundColor: theme.palette.primary.light,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 1,
    },
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
}));

export default useAppStyles;
