import { PersonagemDTO } from "./PersonagemDTO.model";

export class PersonagemCampanhaDTO {
    public aventureiros: PersonagemDTO[];
    public npcs: PersonagemDTO[];
    public inimigos: PersonagemDTO[];

    constructor(
        aventureiros: PersonagemDTO[],
        npcs: PersonagemDTO[],
        inimigos: PersonagemDTO[]
        
    ) {
        this.aventureiros = aventureiros;
        this.npcs = npcs;
        this.inimigos = inimigos;
    }
}