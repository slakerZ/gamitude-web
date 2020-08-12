import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 180;
const useControlPanelStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.secondary.main,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

export default useControlPanelStyles;
