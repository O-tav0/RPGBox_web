import { Turno } from "./Turno.model";

export class CombateLog {
    public resumoCombate: Turno[] | undefined | string; 

    constructor();
    constructor(
        resumoCombate?: Turno[],
    ) {
        this.resumoCombate = resumoCombate;
    }
}