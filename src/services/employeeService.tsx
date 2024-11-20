// src/services/employeeService.ts

import api from '../api/api';
import axios from 'axios';

// Interface que representa as informações de um colaborador
export interface EmployeeInfo {
  email: string;
  name: string;
  telefone: string;
  setor: string;
  cargo: string;
  dataAniversario?: Date;
}

// Interface para a resposta da API ao validar email
export interface ValidateEmailResponse {
  exists: boolean;
  // Adicione outros campos retornados pela API, se necessário
}

// Constantes para endpoints e valores fixos
const EMPLOYEE_ENDPOINT = '/employees';
const EMPLOYEE_EXISTS_ENDPOINT = '/employees/exists';

const employeeService = {
  /**
   * Envia as informações dos colaboradores para a API.
   * @param employees - Array de informações dos colaboradores a serem enviados.
   * @returns Retorna os dados dos colaboradores criados.
   */
  sendEmployeeInfo: async (employees: EmployeeInfo[]) => {
    try {
      console.log('[employeeService] Enviando dados dos colaboradores:', employees);

      // Envio dos dados diretamente como um array, ajuste conforme a API espera
      const response = await api.post<{ colaboradores: EmployeeInfo[] }>(EMPLOYEE_ENDPOINT, { colaboradores: employees });

      console.log('Colaboradores criados com sucesso:', response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao criar colaboradores:', error.response?.data);
      } else {
        console.error('Erro inesperado ao criar colaboradores:', error);
      }
      throw error;
    }
  },

  /**
   * Verifica se um email de colaborador já está registrado.
   * @param email - O email do colaborador a ser validado.
   * @returns Retorna um booleano indicando se o email existe.
   */
  validateEmployeeEmail: async (email: string): Promise<boolean> => {
    try {
      // Garantir que o email esteja em formato adequado
      const cleanedEmail = email.trim().toLowerCase();
      console.log(`Validando email do colaborador: ${cleanedEmail}`);

      const response = await api.get<ValidateEmailResponse>(EMPLOYEE_EXISTS_ENDPOINT, {
        params: {
          email: cleanedEmail,
        },
      });

      console.log('Resposta da API para validar email:', response.data);

      return response.data.exists;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao validar email do colaborador:', error.response?.data);
      } else {
        console.error('Erro inesperado ao validar email do colaborador:', error);
      }
      throw error;
    }
  },

  // Outros métodos relacionados a colaboradores podem ser adicionados aqui
};

export default employeeService;
