import { makeStyles } from "@material-ui/core/styles";

const useProjectsDesktopStyles = makeStyles((theme: any) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "transparent",
        gridArea: "projects",
        boxShadow: "5px 5px 10px #000000",
        overflow: "auto",
    },
    appBar: {
        backgroundColor: "transparent",
    },
    tabs: {
        backgroundColor: theme.palette.secondary.main,
        justifyContent: "center",
    },
}));

export default useProjectsDesktopStyles;
