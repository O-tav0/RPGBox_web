import { CombateLog } from "./CombateLog.model";
import { PersonagemCombateDTO } from "./PersonagemCombateDTO.model";
import { PersonagemDTO } from "./PersonagemDTO.model";

export class CombateDTO {
    public sqCombate: number;
    public dtCombate: string; 
    public statusCombate: string;
    public tituloCombate: string;
    public personagensDoCombate: PersonagemCombateDTO[]
    public resumoCombate: CombateLog;

    constructor(
        sqCombate: number,
        dtCombate: string,
        statusCombate: string,
        tituloCombate: string,
        personagensDoCombate: [],
        resumoCombate: CombateLog
    ) {
        this.sqCombate = sqCombate;
        this.dtCombate = dtCombate;
        this.statusCombate = statusCombate;
        this.tituloCombate = tituloCombate;
        this.personagensDoCombate = personagensDoCombate;
        this.resumoCombate = resumoCombate
    }
}