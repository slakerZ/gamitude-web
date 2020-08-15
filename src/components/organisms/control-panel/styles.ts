import { makeStyles } from "@material-ui/core/styles";
const useControlPanelStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.secondary.main,
    },
    drawer: {
        flexShrink: 0,
    },
}));

export default useControlPanelStyles;
