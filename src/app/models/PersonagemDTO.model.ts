import { HabilidadePersonagem } from "./HabilidadePersonagem.model";
import { Personagem } from "./Personagem.model";

export class PersonagemDTO extends Personagem {
    public sqPersonagem: number;
    constructor(
        sqPersonagem: number,
        classePersonagem: string,
        habilidadesPersonagem: HabilidadePersonagem[],
        imagem: string,
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
            imagem,
            nivelPersonagem,
            nomePersonagem,
            pontosVida,
            racaPersonagem,
            sqCampanha,
            tipoPersonagem
        );
        this.sqPersonagem = sqPersonagem;
    }
}
