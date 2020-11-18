export interface TabPanelProps {
    children: React.ReactNode;
    index: any;
    value: any;
    role: string;
    id: string;
}

export interface a11yType {
    id: string;
    "aria-controls": string;
}
