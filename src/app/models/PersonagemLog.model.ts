import { HabilidadePersonagem } from "./HabilidadePersonagem.model";

export class PersonagemLog {
    public sqPersonagem: number;
    public classePersonagem: string;
    public nivelPersonagem: number;
    public nomePersonagem: string;
    public pontosVida: number;
    public racaPersonagem: string;
    public tipoPersonagem: string;

    constructor(
        sqPersonagem: number,
        classePersonagem: string,
        nivelPersonagem: number,
        nomePersonagem: string,
        pontosVida: number,
        racaPersonagem: string,
        tipoPersonagem: string
    ) {
        this.sqPersonagem = sqPersonagem;
        this.classePersonagem = classePersonagem;
        this.nivelPersonagem = nivelPersonagem;
        this.nomePersonagem = nomePersonagem;
        this.pontosVida = pontosVida;
        this.racaPersonagem = racaPersonagem;
        this.tipoPersonagem = tipoPersonagem;
    }
}
