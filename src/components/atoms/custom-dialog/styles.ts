import { makeStyles, Theme } from "@material-ui/core/styles";

const useCustomDialogStyles = makeStyles((theme: Theme) => ({
    root: {},
    rootPaper: {
        backgroundColor: theme.palette.primary.main,
    },
}));

export default useCustomDialogStyles;
