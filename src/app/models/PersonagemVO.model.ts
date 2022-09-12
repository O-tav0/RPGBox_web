import { HabilidadePersonagem } from "./HabilidadePersonagem.model";
import { Personagem } from "./Personagem.model";

export class PersonagemVO {
    public nomePersonagem: string;
    public racaPersonagem: string;
    public classePersonagem: string;
    public sqCampanha: number;
    public pontosVida: number;
    public imagem: string;
    public tipoPersonagem: string;
    public nivelPersonagem: number;
    public habilidadesPersonagem: HabilidadePersonagem[];
    constructor(
        nomePersonagem: string,
        racaPersonagem: string,
        classePersonagem: string,
        sqCampanha: number,
        pontosVida: number,
        imagem: string,
        tipoPersonagem: string,
        nivelPersonagem: number,
        habilidadesPersonagem: HabilidadePersonagem[]
    ) {
        this.classePersonagem = classePersonagem;
        this.habilidadesPersonagem = habilidadesPersonagem;
        this.imagem = imagem;
        this.nivelPersonagem = nivelPersonagem;
        this.nomePersonagem = nomePersonagem;
        this.pontosVida = pontosVida;
        this.racaPersonagem = racaPersonagem;
        this.sqCampanha = sqCampanha;
        this.tipoPersonagem = tipoPersonagem;
    }
}
