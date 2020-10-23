import { makeStyles } from "@material-ui/core/styles";

const useStatsAndEnergiesStyles = makeStyles((theme) => {
    return {
        root: {
            padding: theme.spacing(1),
        },
        placeholder: {
            padding: theme.spacing(1),
            width: "100%",
            height: "210px",
        },
    };
});

export default useStatsAndEnergiesStyles;
