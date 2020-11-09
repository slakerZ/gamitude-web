import { TimerType } from "api/timers/types";
export interface MethodsReducerType {
    selectedMethod: TimerType;
    methods: TimerType[];
}
