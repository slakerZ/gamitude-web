import { TierType, EnergyType, StatType } from "configs/types";

export interface RankType {
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
    data: RankType;
    success: boolean;
}
