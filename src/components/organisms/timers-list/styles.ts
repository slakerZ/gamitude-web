import { makeStyles, Theme } from "@material-ui/core/styles";

const useMethodsStyels = makeStyles((theme: Theme) => ({
    root: {},
    tab: {
        color: theme.palette.common.white,
        minWidth: theme.spacing(7),
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
    },
    addMethod: {
        backgroundColor: theme.palette.primary.dark,
        width: "50px",
        height: "50px",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
    placeholder: {
        width: "100%",
        height: 50,
    },
    container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
}));

export default useMethodsStyels;
