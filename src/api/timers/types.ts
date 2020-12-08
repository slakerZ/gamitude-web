import { TimerVariantType } from "types";

interface CountDownInfo {
    workTime: number;
    breakTime: number;
    overTime: number;
    longerBreakTime?: number | null;
    breakInterval?: number | null;
}
export interface TimerType {
    id: string;
    userId: string;
    name: string;
    label: string;
    timerType: TimerVariantType;
    countDownInfo: CountDownInfo;
}

export interface TimerRequestBodyType {
    name: string;
    label: string;
    timerType: TimerVariantType;
    countDownInfo: CountDownInfo;
}

export interface TimerResponseBodyType {
    data: TimerType[];
    success: boolean;
}
