// src/services/passwordService.ts

import axios from 'axios';

interface PasswordData {
  email: string;
  senha: string;
}

const passwordService = {
  createPassword: async (data: PasswordData) => {
    try {
      const response = await axios.post('/api/password', data); // Ajuste a URL conforme sua API
      console.log('[passwordService] Senha criada:', response.data);
      return response.data;
    } catch (error) {
      console.error('[passwordService] Erro ao criar a senha:', error);
      throw error;
    }
  },
};

export default passwordService;
