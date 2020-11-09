import { EnergyType } from "types";
import { StatType } from "types";

export interface ProjectType {
    id: string;
    method: number;
    name: string;
    status: number;
    boosted: EnergyType[] | StatType[];
    dominant: EnergyType | StatType;
}
