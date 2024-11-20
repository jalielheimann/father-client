// src/types/types.ts

export interface NacionalDataFormData {
    nomeEmpresa: string;
    razaoSocial: string;
    classificacaoFiscal: string;
    pais: string;
    cep: string;
    rua: string;
    bairro: string;
    numero: string;
  }
  
  export interface SegmentFormData {
    segmento: string;
    subsegmento: string;
  }
  
  export interface EmailFormData {
    email: string;
  }
  
  export interface ContactDataFormData {
    nomeCompleto: string;
    telefone: string;
    setor: string;
    cargo: string;
  }
  
  export interface ContactDataPlusFormData extends ContactDataFormData {
    id: string;
  }
  
  export interface FatherIDFormData {
    desejaCriarFatherID: boolean;
  }
  
  export type Step =
    | 'CnpjInfo'
    | 'NacionalData'
    | 'Segment'
    | 'EmailInfo'
    | 'ContactData'
    | 'ContactDataPlus'
    | 'FatherID'
    | 'Completed';
  
  export interface FormData {
    cnpj?: string;
    nacionalData?: NacionalDataFormData;
    segment?: SegmentFormData;
    email?: string;
    contacts: ContactDataPlusFormData[];
    fatherID?: FatherIDFormData;
  }
  