export interface HomePagePropTypes {
    token: string;
}

export interface SlideType {
    subtitle: string;
    paragraphs: string[];
}

export interface SlideContentTypePropTypes {
    token: string;
    contentText: SlideType[];
}

interface DevLinkType {
    target: string;
    ref: string;
}

export interface CreatorType {
    image: string;
    name: string;
    positions: string[];
    links: DevLinkType[];
}

export interface AttributionType {
    ref: string;
    name: string;
}
