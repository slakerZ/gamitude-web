import { MethodType } from "../../../redux/methods/types";

export interface MethodsPropType {
    methods: MethodType[];
    setSelectedMethod: (value: number) => null;
    setMethods: any;
    selectedMethod: MethodType;
}
