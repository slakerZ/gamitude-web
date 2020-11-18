export interface TimerType {
    label: string;
    id: string;
    userId: string;
    name: string;
    workTime: number;
    breakTime: number;
    overTime: number;
    longerBreakTime?: number | null;
    breakInterval?: number | null;
}

export interface TimerRequestBodyType {
    workTime: number;
    breakTime: number;
    overTime: number;
    name: string;
    longerBreakTime?: number | null;
    breakInterval?: number | null;
}

export interface TimerResponseBodyType {
    data: TimerType[];
    success: boolean;
}