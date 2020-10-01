import { a11yType } from "./types";

export const a11yProps = (index: string | number): a11yType => {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
};
