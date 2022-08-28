export class HabilidadePersonagem {
    public descricaoHabilidade: string;
    public nomeHabilidade: string;
    public tipoHabilidade: string;

    constructor(
        descricaoHabilidade: string,
        nomeHabilidade: string,
        tipoHabilidade: string
    ) {
        this.descricaoHabilidade = descricaoHabilidade;
        this.nomeHabilidade = nomeHabilidade;
        this.tipoHabilidade = tipoHabilidade;
    }
}
