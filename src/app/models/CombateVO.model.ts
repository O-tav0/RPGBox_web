export class PersonagemCombateVO {
    public sqPersonagem: number;

    constructor(
        sqPersonagem: number,
        
      ) {
        this.sqPersonagem = sqPersonagem; 
      }
}

export class CombateVO {
    public sqCampanha: number;
    public tituloCombate: string;
    public personagensCombate: PersonagemCombateVO[];

    constructor(
        sqCampanha: number,
        tituloCombate: string,
        personagensCombate: PersonagemCombateVO[],

    ) {
      this.sqCampanha = sqCampanha;
      this.tituloCombate = tituloCombate;
      this.personagensCombate = personagensCombate;
    }
  }
  