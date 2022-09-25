import { PersonagemDTO } from "./PersonagemDTO.model";

export class PersonagemCombateDTO {
    public personagem: PersonagemDTO;
    public nrOrdemCombate: number; 
    

    constructor(
        personagem: PersonagemDTO,
        nrOrdemCombate: number
        
    ) {
        this.personagem = personagem;
        this.nrOrdemCombate = nrOrdemCombate;
    }
}