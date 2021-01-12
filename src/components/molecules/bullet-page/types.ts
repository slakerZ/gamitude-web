import { PageType } from "api/bulletPages/types";

export default interface PagePropTypes {
    pagesCurrJournalIndex: string | boolean;
    tasksCurrPageIndex: string | boolean;
    handleChangeCurrentPage: any;
    handleOpenNewPageDialog: () => void;
    pages: PageType[];
}
