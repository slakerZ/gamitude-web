import { ReduxStateType } from "../root.reducer";

export const selectSelectedMethod = (state: ReduxStateType) =>
    state.methods.selectedMethod;

export const selectMethods = (state: ReduxStateType) => state.methods.methods;
