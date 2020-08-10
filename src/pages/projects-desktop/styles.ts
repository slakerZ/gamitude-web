import { makeStyles } from "@material-ui/core/styles";

const useProjectsDesktopStyles = makeStyles((theme: any) => ({
    projectsDesktopPage: {
        display: "grid",
        gap: "20px",
        padding: "20px",
        overflow: "auto",
        height: "90vh",

        [theme.breakpoints.down("lg")]: {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `
                    "rank projects"
                    "energies stats"
                `,
        },

        [theme.breakpoints.up("lg")]: {
            gridTemplateColumns: "1fr 1.5fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `
                    "rank projects energies"
                    "rank projects stats"
                `,
        },
    },
}));

export default useProjectsDesktopStyles;
