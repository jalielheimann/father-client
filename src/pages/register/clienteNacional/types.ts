// src/pages/register/clienteNacional/types.ts

export enum Step {
    CnpjInfo = 'CnpjInfo',
    NacionalData = 'NacionalData',
    EmailInfo = 'EmailInfo',
    ContactData = 'ContactData',
    ContactDataPlus = 'ContactDataPlus',
    MoreContact = 'MoreContact',
    FatherID = 'FatherID',
  }
  
  export interface Contact {
    nomeCompleto: string;
    telefone: string;
    setor: string;
    cargo: string;
    email?: string; // Campo opcional para ContactDataPlus
  }
  
  export interface ClienteNacionalFormData {
    cnpj?: string;
    cnpjExists?: boolean;
    email?: string;
    emailExists?: boolean;
    contatos: Contact[];
    addMoreContacts?: boolean;
    nomeEmpresa?: string;
    razaoSocial?: string;
    classificacaoFiscal?: string;
    pais?: string;
    cep?: string;
    rua?: string;
    bairro?: string;
    numero?: string;
    segmento?: string;
    subsegmento?: string;
    desejaCriarFatherID?: boolean;
    // Adicione mais campos conforme necessário para etapas futuras
  }
  