import { EnergyType } from "../energies/types";
import { StatType } from "../stats/types";

export interface ProjectType {
    id: string;
    method: number;
    name: string;
    status: number;
    boosted: EnergyType[] | StatType[];
    dominant: EnergyType | StatType;
}
