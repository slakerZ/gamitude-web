import { makeStyles, Theme } from "@material-ui/core/styles";

const useMethodsStyels = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
    },
    tab: {
        color: theme.palette.common.white,
        minWidth: theme.spacing(7),
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
    },
    addMethod: {
        paddingLeft: 0,
    },
    item: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export default useMethodsStyels;
