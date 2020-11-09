import { TierType, EnergyType, StatType } from "types";

export interface FullRankType {
    id: string;
    name: string;
    style: "DEFAULT";
    tier: TierType;
    dominant: EnergyType | StatType;
    imageUrl: string;
    priceStrength: number;
    priceIntelligence: number;
    priceFluency: number;
    priceCreativity: number;
    priceEuro: number;
}

export interface RankResponseBodyType {
    data: FullRankType;
    success: boolean;
}
