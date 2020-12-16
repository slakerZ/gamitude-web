import { makeStyles, Theme } from "@material-ui/core/styles";

const useCustomDialogStyles = makeStyles((theme: Theme) => ({
    root: {},
    rootPaper: {
        backgroundColor: theme.palette.primary.main,
    },
    newFolderDialogBody: {
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    addProjectDialogContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}));

export default useCustomDialogStyles;