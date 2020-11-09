import { TimerType } from "api/timers/types";

export interface MethodsPropType {
    methods: TimerType[];
    setSelectedMethod: (value: number) => null;
    addTimer: any;
    selectedMethod: TimerType;
    token: string;
    setTimers: any;
}
