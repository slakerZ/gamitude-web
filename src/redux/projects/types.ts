export interface SetBoostedPropTypes {
    index: number;
    newBoosted: string[];
}

export interface SetBoostedReturnValues {
    type: string;
    index: number;
    boosted: string[];
}

export interface SetDominantPropTypes {
    index: number;
    newDominant: string;
}

export interface SetDominantReturnValues {
    type: string;
    index: number;
    dominant: string;
}

export interface SetNamePropTypes {
    index: number;
    name: string;
}

export interface SetNameReturnValues {
    type: string;
    index: number;
    name: string;
}

export interface SetMethodPropTypes {
    index: number;
    method: any;
}

export interface SetMethodReturnValues {
    type: string;
    index: number;
    method: any;
}
