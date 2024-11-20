// src/pages/register/clienteNacional/components/cnpjInfo.tsx

import React, { useEffect } from 'react';
import { useForm, Controller, useWatch, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { validateCNPJ } from '@/utils/validateCNPJ';
import companyService from '@/services/companyService';

/**
 * Propriedades para o componente CnpjInfo.
 * @property onNext - Função chamada quando o formulário é submetido com sucesso.
 */
interface CnpjInfoProps {
  onNext: (data: { cnpj: string; cnpjExists: boolean }) => void;
}

/**
 * Interface para os dados do formulário CNPJ.
 * @property cnpj - O CNPJ inserido pelo usuário.
 */
interface CnpjFormData {
  cnpj: string;
}

/**
 * Esquema de validação Zod para o campo cnpj.
 * 
 * - Verifica se o campo não está vazio.
 * - Verifica se o formato está correto usando uma expressão regular.
 * - Verifica se o CNPJ é válido usando a função `validateCNPJ`.
 */
const cnpjSchema = z.object({
  cnpj: z.string()
    .nonempty('O CNPJ é obrigatório')
    .refine((value) => /^[\d]{2}\.[\d]{3}\.[\d]{3}\/[\d]{4}-[\d]{2}$/.test(value), {
      message: 'Formato de CNPJ inválido',
    })
    .refine((value) => validateCNPJ(value), {
      message: 'CNPJ inválido',
    }),
});

/**
 * Componente responsável por coletar e validar o CNPJ do usuário.
 * 
 * @param onNext Função chamada quando o formulário é submetido com sucesso.
 */
const CnpjInfo: React.FC<CnpjInfoProps> = ({ onNext }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CnpjFormData>({
    resolver: zodResolver(cnpjSchema),
    defaultValues: {
      cnpj: '',
    }
  });

  // Observa as mudanças no campo 'cnpj'
  const watchedCnpj = useWatch({ control, name: 'cnpj' });

  /**
   * Efeito que registra mudanças no campo cnpj.
   */
  useEffect(() => {
    if (watchedCnpj) {
      console.log('[CnpjInfo] Valor do CNPJ mudou para:', watchedCnpj);
    }
  }, [watchedCnpj]);

  /**
   * Função chamada quando o formulário é submetido.
   * 
   * @param data Dados do formulário submetido (CNPJ).
   */
  const onSubmit: SubmitHandler<CnpjFormData> = async (data) => {
    console.log('[CnpjInfo] Formulário submetido. Dados recebidos:', data);

    // Remove caracteres não numéricos do CNPJ
    const cleanedCNPJ = data.cnpj.replace(/[^\d]+/g, '');
    console.log('[CnpjInfo] CNPJ limpo:', cleanedCNPJ);

    try {
      console.log('[CnpjInfo] Chamando companyService.validateCNPJ para verificar se o CNPJ existe...');
      const cnpjExists = await companyService.validateCNPJ(cleanedCNPJ);
      console.log(`[CnpjInfo] Resultado da verificação se CNPJ existe:`, cnpjExists);

      // Chama a função onNext com cnpj e cnpjExists
      console.log('[CnpjInfo] Chamando a função onNext com o CNPJ limpo e cnpjExists:', cnpjExists);
      onNext({ cnpj: cleanedCNPJ, cnpjExists });
      console.log('[CnpjInfo] Função onNext foi chamada. Passamos cnpjExists para o componente pai.');
    } catch (error) {
      console.error('[CnpjInfo] Erro ao verificar se o CNPJ existe:', error);
      // Opcionalmente, exibir mensagem de erro ao usuário
      alert('Ocorreu um erro ao validar o CNPJ. Por favor, tente novamente.');
    }
  };

  console.log('[CnpjInfo] Renderização do componente. Estado atual:', { errors, isSubmitting, watchedCnpj });

  return (
    <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className='pb-0'>
          <CardTitle>Digite seu CNPJ</CardTitle>
          <CardDescription>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => (
                <InputMask
                  mask="99.999.999/9999-99"
                  value={field.value}
                  onChange={(event) => {
                    field.onChange(event);
                    console.log('[CnpjInfo] O campo CNPJ foi alterado para:', event.target.value);
                  }}
                  onBlur={(event) => {
                    field.onBlur();
                    console.log('[CnpjInfo] O campo CNPJ perdeu foco. Valor atual:', event.target.value);
                  }}
                >
                  {(inputProps: any) => (
                    <Input 
                      {...inputProps}
                      placeholder='00.000.000/0000-00'
                      type="text"
                      autoComplete="off"
                      // Mantendo o estilo dos componentes shadcn e tailwind
                      className='input input-bordered w-full'
                    />
                  )}
                </InputMask>
              )}
            />
            {errors.cnpj && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cnpj.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className='py-4 flex justify-end'>
          <Button 
            className='w-full flex items-center justify-center'
            type="submit"
            disabled={isSubmitting}
            onClick={() => console.log('[CnpjInfo] Botão "Próximo" clicado. Tentando submeter o formulário...')}
          >
            {isSubmitting ? 'Validando...' : 'Próximo'} <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default CnpjInfo;
