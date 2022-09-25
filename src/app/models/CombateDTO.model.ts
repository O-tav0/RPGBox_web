import { PersonagemCombateDTO } from "./PersonagemCombateDTO.model";
import { PersonagemDTO } from "./PersonagemDTO.model";

export class CombateDTO {
    public sqCombate: number;
    public dtCombate: string; 
    public statusCombate: string;
    public tituloCombate: string;
    public personagensDoCombate: PersonagemCombateDTO[]

    constructor(
        sqCombate: number,
        dtCombate: string,
        statusCombate: string,
        tituloCombate: string,
        personagensDoCombate: []
    ) {
        this.sqCombate = sqCombate;
        this.dtCombate = dtCombate;
        this.statusCombate = statusCombate;
        this.tituloCombate = tituloCombate;
        this.personagensDoCombate = personagensDoCombate;
    }
}