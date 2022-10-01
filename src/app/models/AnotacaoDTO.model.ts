import { PersonagemCombateDTO } from "./PersonagemCombateDTO.model";
import { PersonagemDTO } from "./PersonagemDTO.model";

export class AnotacaoDTO {
    public sqAnotacao: number;
    public descricaoAnotacao: string; 
    public dataAnotacao: string;
    

    constructor(
        sqAnotacao: number,
        descricaoAnotacao: string,
        dataAnotacao: string
    ) {
        this.sqAnotacao = sqAnotacao;
        this.descricaoAnotacao = descricaoAnotacao;
        this.dataAnotacao = dataAnotacao;
    }
}