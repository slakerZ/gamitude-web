import { makeStyles, Theme } from "@material-ui/core/styles";

const useCustomToggleButtonGroupStyles = makeStyles((theme: Theme) => ({
    btnGroup: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-around",
    },
    btn: {
        "&.Mui-selected": {
            background: theme.palette.primary.light,
            "&:hover": {
                background: theme.palette.primary.light,
            },
        },
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
}));

export default useCustomToggleButtonGroupStyles;
