export interface SimpleTooltipType {
    variant: string;
    title: string;
    bodyItems: string[];
}

export interface ComplexTooltipType {
    variant: string;
    title: string;
    subtitle: string;
    listIntro: string;
    listItems: string[];
}

export interface TooltipProps {
    target: string;
    variant: string;
}
