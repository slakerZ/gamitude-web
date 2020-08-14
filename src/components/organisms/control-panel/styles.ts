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
}));

export default useControlPanelStyles;
