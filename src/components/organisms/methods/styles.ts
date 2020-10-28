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
}));

export default useMethodsStyels;
