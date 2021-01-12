import { JournalType } from "api/bulletJournal/types";

export interface JournalPropTypes {
    journals: JournalType[];
    pagesCurrJournalIndex: string | boolean;
    handleChangeCurrentJournal: any;
    handleOpenNewJournalDialog: () => void;
}
