export interface TimerType {
    label: string;
    id: string;
    userId: string;
    name: string;
    workTime: number;
    breakTime: number;
    overTime: number;
    longerBreakTime: number;
    breakInterval: number;
}

export interface TimerRequestBodyType {
    workTime: number;
    breakTime: number;
    overTime: number;
    name: string;
    longerBreakTime: number;
    breakInterval: number;
}

export interface TimerResponseBodyType {
    data: TimerType[];
    success: boolean;
}
