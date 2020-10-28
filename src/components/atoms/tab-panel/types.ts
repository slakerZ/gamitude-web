export interface TabPanelProps {
    children: React.ReactNode;
    index: number;
    value: number;
    role: string;
    id: string;
}

export interface a11yType {
    id: string;
    "aria-controls": string;
}
