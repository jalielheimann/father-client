// src/services/contactService.tsx

import api from '../api/api';

interface ContactInfo {
    name: string;
    email: string;
    phone: string;
    role: string;
    sector: string;
    companyID: string;
  }

interface ValidateEmailResponse {
    contactExists: boolean;
    userExists: boolean;
    // Adicione outros campos retornados pela API, se necessário
}

const contactService = {
    /**
     * Valida se um email existe no banco de dados.
     * @param email - O email a ser validado.
     * @returns Retorna um booleano indicando se o email existe em contatos ou usuários.
     */

    sendContactInfo: async (contactInfo: ContactInfo) => {
        try {
          const response = await api.post('/contacts', { contactInfo });
          console.log('Contato criado com sucesso:', response.data);
          return response.data;
        } catch (error) {
          console.error('Erro ao criar contato:', error);
          throw error;
        }
      },
    validateEmail: async (email: string): Promise<boolean> => {
        try {
            console.log(`Validando email: ${email}`); // Log do email a ser validado

            // Faz uma requisição GET para a rota correta, garantindo a codificação do email
            const response = await api.get<ValidateEmailResponse>(`contacts/check-email/${encodeURIComponent(email)}`);
            
            console.log('Resposta da API para validar Email:', response.data); // Log da resposta da API

            // Retorna true se o email existir em contatos ou usuários
            return response.data.contactExists || response.data.userExists;
        } catch (error) {
            console.error('Erro ao validar Email:', error);
            throw error; // Propaga o erro para ser tratado no componente
        }
    },
    
    // Outros métodos relacionados a contacts podem ser adicionados aqui
};

export default contactService;
