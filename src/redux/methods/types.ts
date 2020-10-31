export interface MethodsReducerType {
    selectedMethod: MethodType;
    methods: MethodType[];
}

export interface MethodType {
    label: string;
    name: string;
    minutes: number;
    shortBreak: number;
    hasLongBreak: boolean;
    longBreak: number;
    longBreakInterval: number;
    type: "TIMER" | "STOPWATCH";
}
