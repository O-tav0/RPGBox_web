
export enum TipoDeHabilidadeEnum {
    ATAQUE,
    SUPORTE

}

export class TipoHabilidade{
    public nome: string;
    public valor: TipoDeHabilidadeEnum;
}