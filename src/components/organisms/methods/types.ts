import { TimerType } from "api/timers/types";

export interface MethodsPropType {
    methods: TimerType[];
    setSelectedTimer: any;
    addTimer: any;
    selectedMethod: TimerType;
    token: string;
    setTimers: any;
}
