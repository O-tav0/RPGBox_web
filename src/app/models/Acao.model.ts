import { HabilidadePersonagem } from "./HabilidadePersonagem.model";
import { PersonagemDTO } from "./PersonagemDTO.model";
import { PersonagemLog } from "./PersonagemLog.model";

export class Acao {
    public habilidadeUtilizada: HabilidadePersonagem;
    public personagemQueUtilizou: PersonagemLog; 
    public personagemAlvo: PersonagemLog;
    public danoCausado: number ;

    constructor(
        habilidadeUtilizada: HabilidadePersonagem,
        personagemQueUtilizou: PersonagemLog,
        personagemAlvo: PersonagemLog,
        danoCausado:number
    ) {
        this.habilidadeUtilizada = habilidadeUtilizada;
        this.personagemQueUtilizou = personagemQueUtilizou;
        this.personagemAlvo = personagemAlvo;
        this.danoCausado = danoCausado;
    }
}