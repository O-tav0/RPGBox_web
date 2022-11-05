import { PersonagemCombateVO } from "./CombateVO.model";

export class AtualizaCombateVO {
    public tituloCombate: string;
    public personagensCombate: PersonagemCombateVO[]; 
    
    constructor(
        tituloCombate: string,
        personagensCombate: PersonagemCombateVO[],
    ) {
        this.tituloCombate = tituloCombate;
        this.personagensCombate = personagensCombate;
    }
}