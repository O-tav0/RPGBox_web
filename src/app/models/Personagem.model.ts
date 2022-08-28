import { HabilidadePersonagem } from "./HabilidadePersonagem.model";
export class Personagem {
    public classePersonagem: string;
    public habilidadesPersonagem: HabilidadePersonagem[];
    public imagem: string;
    public nivelPersonagem: number;
    public nomePersonagem: string;
    public pontosVida: number;
    public racaPersonagem: string;
    public sqCampanha: number;
    public tipoPersonagem: string;

    constructor(
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
