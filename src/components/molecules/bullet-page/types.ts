import { PageType } from "api/bulletPages/types";

export default interface PagePropTypes {
    pagesCurrJournalIndex: number;
    tasksCurrPageIndex: number;
    handleChangeCurrentPage: any;
    handleOpenNewPageDialog: () => void;
    pages: PageType[];
}
