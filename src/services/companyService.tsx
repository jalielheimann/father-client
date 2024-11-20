// src/services/companyService.ts

import api from '../api/api';

interface CompanyInfo {
  country: string;
  companyName: string;
  socialNameCompany: string;
  companyID: string;
  typeID: string;
  socialClass: string;
  Segment: string;
  SubSegment: string[];
  website: string;
  State: string;
  City: string;
  Address: string;
  type: string;
}

interface ValidateCNPJResponse {
  exists: boolean;
  // Adicione outros campos retornados pela API, se necessário
}

const companyService = {
  sendCompanyInfo: async (companyInfo: CompanyInfo) => {
    try {
      console.log('[companyService] Enviando companyInfo:', companyInfo);

      // Envolvendo companyInfo dentro de um objeto
      const response = await api.post('/companies', { companyInfo });

      console.log('Empresa criada com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      throw error;
    }
  },

  /**
   * Verifica se um companyID já existe com typeID 'CNPJ'.
   * @param companyID - O ID da empresa a ser validado.
   * @returns Retorna um booleano indicando se o companyID existe.
   */
  validateCNPJ: async (companyID: string): Promise<boolean> => {
    try {
      // Garantir que apenas números sejam enviados
      const cleanedCompanyID = companyID.replace(/[^\d]+/g, '');
      console.log(`Validando CNPJ: ${cleanedCompanyID}`); // Log do CNPJ limpo

      const response = await api.get<ValidateCNPJResponse>('companies/exists', {
        params: {
          companyID: cleanedCompanyID,
          typeID: 'CNPJ',
        },
      });

      console.log('Resposta da API para validar CNPJ:', response.data); // Log da resposta da API

      return response.data.exists;
    } catch (error) {
      console.error('Erro ao validar CNPJ:', error);
      throw error;
    }
  },

  // Outros métodos relacionados a companies podem ser adicionados aqui
};

export default companyService;
