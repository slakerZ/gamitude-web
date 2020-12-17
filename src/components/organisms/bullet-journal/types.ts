import { JournalType } from "api/bulletJournal/types";

export interface JournalPropTypes {
    journals: JournalType[];
    pagesCurrJournalIndex: number;
    handleChangeCurrentJournal: any;
    handleOpenNewJournalDialog: () => void;
}
