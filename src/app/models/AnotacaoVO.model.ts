import { PersonagemCombateDTO } from "./PersonagemCombateDTO.model";
import { PersonagemDTO } from "./PersonagemDTO.model";

export class AnotacaoVO {
    public sqCampanha: number;
    public anotacao: string; 

    constructor(
        sqCampanha: number,
        anotacao: string
    ) {
        this.sqCampanha = sqCampanha;
        this.anotacao = anotacao;
    }
}