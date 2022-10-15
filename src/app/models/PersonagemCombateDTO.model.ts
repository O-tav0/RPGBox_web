import { PersonagemDTO } from "./PersonagemDTO.model";

export class PersonagemCombateDTO {
    public personagem: any;
    public nrOrdemCombate: number; 
    

    constructor(
        personagem: PersonagemDTO,
        nrOrdemCombate: number
        
    ) {
        this.personagem = personagem;
        this.nrOrdemCombate = nrOrdemCombate;
    }
}