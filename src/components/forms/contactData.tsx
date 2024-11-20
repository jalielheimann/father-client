// src/components/forms/contactData.tsx

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClienteNacionalFormData, Contact } from '../../pages/register/clienteNacional/types'; // Importando de types.ts

/**
 * Interface para os dados do formulário ContactData.
 */
interface ContactDataFormData extends Omit<Contact, 'email'> {
  // Não inclui email
}

/**
 * Esquema de validação Zod para ContactData.
 */
const contactDataSchema = z.object({
  nomeCompleto: z.string().nonempty('O nome completo é obrigatório'),
  telefone: z.string().nonempty('O telefone é obrigatório')
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
  setor: z.string().nonempty('O setor é obrigatório'),
  cargo: z.string().nonempty('O cargo é obrigatório'),
});

/**
 * Propriedades para o componente ContactData.
 * @property onNext - Função chamada quando o formulário é submetido com sucesso.
 * @property email - Email do usuário da etapa anterior.
 */
interface ContactDataProps {
  onNext: (data: Partial<ClienteNacionalFormData>) => void;
  email: string; // Nova prop para receber o email
}

const ContactData: React.FC<ContactDataProps> = ({ onNext, email }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactDataFormData>({
    resolver: zodResolver(contactDataSchema),
    defaultValues: {
      nomeCompleto: '',
      telefone: '',
      setor: '',
      cargo: '',
    }
  });

  /**
   * Função chamada quando o formulário é submetido.
   * @param data Dados do formulário submetido.
   */
  const submitHandler: SubmitHandler<ContactDataFormData> = (data) => {
    onNext({
      contatos: [
        {
          nomeCompleto: data.nomeCompleto,
          telefone: data.telefone,
          setor: data.setor,
          cargo: data.cargo,
          email: email, // Incluindo o email recebido como prop
        }
      ]
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
        <CardHeader className='pb-0'>
          <CardTitle>Nome completo</CardTitle>
          <CardDescription>
            <Controller
              name="nomeCompleto"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='Digite seu nome completo' />
              )}
            />
            {errors.nomeCompleto && (
              <span className="text-red-500 text-sm mt-1">
                {errors.nomeCompleto.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardHeader className='my-0 py-4'>
          <CardTitle>Telefone</CardTitle>
          <CardDescription>
            <Controller
              name="telefone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='Digite seu telefone' />
              )}
            />
            {errors.telefone && (
              <span className="text-red-500 text-sm mt-1">
                {errors.telefone.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardHeader className='my-0 py-0'>
          <CardTitle>Setor</CardTitle>
          <CardDescription>
            <Controller
              name="setor"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Setor de Atuação</SelectLabel>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="diretoria">Diretoria</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.setor && (
              <span className="text-red-500 text-sm mt-1">
                {errors.setor.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardHeader className='my-0 pt-4 pb-0 px-6'>
          <CardTitle>Cargo</CardTitle>
          <CardDescription>
            <Controller
              name="cargo"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cargo</SelectLabel>
                      <SelectItem value="analista">Analista</SelectItem>
                      <SelectItem value="assistente">Assistente</SelectItem>
                      <SelectItem value="diretor">Diretor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cargo && (
              <span className="text-red-500 text-sm mt-1">
                {errors.cargo.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardFooter className='py-4 flex  w-full'>
          <Button className='flex items-center w-full' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Validando...' : 'Próximo'} <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ContactData;
