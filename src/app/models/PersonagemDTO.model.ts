import { HabilidadePersonagem } from "./HabilidadePersonagem.model";
import { Personagem } from "./Personagem.model";

export class PersonagemDTO extends Personagem {
    public sqPersonagem: number;
    constructor(
        classePersonagem: string,
        habilidadesPersonagem: HabilidadePersonagem[],
        imagemPersonagem: string,
        nivelPersonagem: number,
        nomePersonagem: string,
        pontosVida: number,
        racaPersonagem: string,
        sqCampanha: number,
        tipoPersonagem: string
    ) {
        super(
            classePersonagem,
            habilidadesPersonagem,
            imagemPersonagem,
            nivelPersonagem,
            nomePersonagem,
            pontosVida,
            racaPersonagem,
            sqCampanha,
            tipoPersonagem
        );
    }
}
