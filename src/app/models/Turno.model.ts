import { Acao } from "./Acao.model";

export class Turno {
    public numeroTurno: number | undefined;
    public acoesDoTurno: Acao[] | undefined; 

    constructor();
    constructor(
        numeroTurno?: number,
        acoesDoTurno?: Acao[],
    ) {
        this.numeroTurno = numeroTurno;
        this.acoesDoTurno = acoesDoTurno;
    }
}