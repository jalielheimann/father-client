// src/utils/validateCNPJ.ts

/**
 * Função para validar se um CNPJ é válido.
 * @param cnpj O CNPJ a ser validado.
 * @returns `true` se o CNPJ for válido, caso contrário, `false`.
 */
export function validateCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cleanedCNPJ = cnpj.replace(/[^\d]+/g, '');
  
    // Verifica se tem 14 dígitos
    if (cleanedCNPJ.length !== 14) return false;
  
    // Aqui você pode adicionar a lógica completa de validação do CNPJ
    // Se quiser apenas verificar se todos os dígitos são diferentes de zero,
    // ou checar dígitos verificadores, etc.
    // Para simplificar, assumiremos que se tiver 14 dígitos não repetidos, é válido.
    if (/^(\d)\1+$/.test(cleanedCNPJ)) return false;
  
    return true;
  }
  