import { makeStyles } from "@material-ui/core/styles";
const useControlPanelStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
    },
    drawer: {},
    toolbar: {
        display: "flex",

        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

export default useControlPanelStyles;
