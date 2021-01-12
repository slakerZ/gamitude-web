import { JournalType } from "api/bulletJournal/types";

import { JournalsActionTypes } from "./journals.types";

export const addJournal = (value: JournalType) => ({
    type: JournalsActionTypes.ADD_JOURNAL,
    payload: value,
});

export const setJournals = (value: any) => ({
    type: JournalsActionTypes.SET_JOURNALS,
    payload: value,
});
