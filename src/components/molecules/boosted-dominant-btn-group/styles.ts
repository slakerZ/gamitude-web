import { makeStyles, Theme } from "@material-ui/core/styles";

const useBoostedDominantBtnGroupStyles = makeStyles((theme: Theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(2, 0),
        },
    },
    container: {
        display: "flex",
        flexDirection: "column",
    },
}));

export default useBoostedDominantBtnGroupStyles;
