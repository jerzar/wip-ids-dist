import * as FRAGS from "@thatopen/fragments";
import { Components } from "../../../../core";
import { IDSCheck, IDSCheckResult, IDSFacetParameter } from "../types";
import { IDSFacet } from "./Facet";
export declare class IDSMaterial extends IDSFacet {
    facetType: "Material";
    value?: IDSFacetParameter;
    uri?: string;
    protected getMaterialDefinition: {
        1838606355: (attr: any) => any;
        248100487: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string | null>;
        3303938423: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string[] | string | null>;
        1303795690: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string[] | string | null>;
        2235152071: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string | null>;
        164193824: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string[] | string | null>;
        3079605661: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string[] | string | null>;
        3708119000: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string | null>;
        2852063980: (model: FRAGS.FragmentsGroup, attr: any) => Promise<string[] | string | null>;
    };
    constructor(components: Components, value?: IDSFacetParameter);
    serialize(type: "applicability" | "requirement"): string;
    getEntities(model: FRAGS.FragmentsGroup, collector?: FRAGS.IfcProperties): Promise<number[]>;
    test(entities: FRAGS.IfcProperties, model: FRAGS.FragmentsGroup): Promise<IDSCheckResult[]>;
    protected evalValue(attrs: any, checks?: IDSCheck[]): Promise<boolean>;
}
