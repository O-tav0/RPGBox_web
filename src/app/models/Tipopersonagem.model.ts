
export enum TipoDoPersonagemEnum {
    AVENTUREIRO,
    NPC,
    INIMIGO
}

export class TipoPersonagem {
    public nome: string;
    public valor: TipoDoPersonagemEnum;
}