export interface SimpleTooltipTextType {
    variant: string;
    title: string;
    bodyItems: string[];
}

export interface ComplexTooltipTextType {
    variant: string;
    title: string;
    subtitle: string;
    listIntro: string;
    listItems: string[];
}

export interface TooltipTextProps {
    target: string;
    variant: string;
}
