import { PersonagemDTO } from "./PersonagemDTO.model";

export class Historico {
    public sqEventoCampanha: number;
    public descricaoEventoCampanha: string
    public dataEvento: string
    public personagem: PersonagemDTO
    public combate: null
    public anotacao: null

    constructor(
        sqEventoCampanha: number,
        descricaoEventoCampanha: string,
        dataEvento: string,
        personagem: PersonagemDTO,
        combate: null,
        anotacao: null
    ){
        this.sqEventoCampanha = sqEventoCampanha
        this.descricaoEventoCampanha = descricaoEventoCampanha,
        this.dataEvento = dataEvento,
        this.personagem = personagem
        this.combate = combate
        this.anotacao = anotacao
    }
}