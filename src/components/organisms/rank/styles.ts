import { makeStyles } from "@material-ui/core/styles";

const useRankStyles = makeStyles((theme) => {
    return {
        root: {
            margin: theme.spacing(2, 10),
        },
        rank: {
            width: "20vh",
            height: "20vh",
        },
        placeholder: {
            width: "20vh",
            height: "20vh",
        },
    };
});

export default useRankStyles;
