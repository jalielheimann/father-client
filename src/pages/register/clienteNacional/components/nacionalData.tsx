// src/components/forms/nacionalData.tsx

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

import { ClienteNacionalFormData } from '@/pages/register/clienteNacional/types'; // Ajuste o caminho conforme necessário

interface NacionalDataProps {
  onNext: (data: Partial<ClienteNacionalFormData>) => void;
}

interface NacionalDataFormData {
  nomeEmpresa: string;
  razaoSocial: string;
  classificacaoFiscal: string;
  pais: string;
  cep: string;
  rua: string;
  bairro: string;
  numero: string;
  segmento: string; // Novo campo
  subsegmento: string; // Novo campo
}

const nacionalDataSchema = z.object({
  nomeEmpresa: z.string().nonempty('O nome da empresa é obrigatório'),
  razaoSocial: z.string().nonempty('A razão social é obrigatória'),
  classificacaoFiscal: z.string().nonempty('A classificação fiscal é obrigatória'),
  pais: z.string().nonempty('O país é obrigatório'),
  cep: z.string().nonempty('O CEP é obrigatório').regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  rua: z.string().nonempty('A rua é obrigatória'),
  bairro: z.string().nonempty('O bairro é obrigatório'),
  numero: z.string().nonempty('O número é obrigatório'),
  segmento: z.string().nonempty('O segmento é obrigatório'),
  subsegmento: z.string().nonempty('O subsegmento é obrigatório'),
});

const NacionalData: React.FC<NacionalDataProps> = ({ onNext }) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<NacionalDataFormData>({
    resolver: zodResolver(nacionalDataSchema),
    defaultValues: {
      nomeEmpresa: '',
      razaoSocial: '',
      classificacaoFiscal: '',
      pais: '',
      cep: '',
      rua: '',
      bairro: '',
      numero: '',
      segmento: '',
      subsegmento: '',
    }
  });

  const submitHandler: SubmitHandler<NacionalDataFormData> = (data) => {
    onNext({
      nomeEmpresa: data.nomeEmpresa,
      razaoSocial: data.razaoSocial,
      classificacaoFiscal: data.classificacaoFiscal,
      pais: data.pais,
      cep: data.cep,
      rua: data.rua,
      bairro: data.bairro,
      numero: data.numero,
      segmento: data.segmento, // Incluindo o novo campo
      subsegmento: data.subsegmento, // Incluindo o novo campo
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        {/* COMPANY DATA 1 */}
        <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
          <CardHeader className='pb-0'>
            <CardTitle>Nome da empresa</CardTitle>
            <CardDescription>
              <Controller
                name="nomeEmpresa"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite o nome da empresa' />
                )}
              />
              {errors.nomeEmpresa && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.nomeEmpresa.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 py-4'>
            <CardTitle>Razão Social</CardTitle>
            <CardDescription>
              <Controller
                name="razaoSocial"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite sua razão social' />
                )}
              />
              {errors.razaoSocial && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.razaoSocial.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 py-0'>
            <CardTitle>Classificação fiscal</CardTitle>
            <CardDescription>
              <Controller
                name="classificacaoFiscal"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Classificação</SelectLabel>
                        <SelectItem value="simplesNacional">Simples Nacional</SelectItem>
                        <SelectItem value="lucroPresumido">Lucro Presumido</SelectItem>
                        <SelectItem value="lucroReal">Lucro Real</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.classificacaoFiscal && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.classificacaoFiscal.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 pt-4 pb-0 px-6'>
            <CardTitle>País</CardTitle>
            <CardDescription>
              <Controller
                name="pais"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>País</SelectLabel>
                        <SelectItem value="brasil">Brasil</SelectItem>
                        <SelectItem value="estadosUnidos">Estados Unidos</SelectItem>
                        <SelectItem value="portugal">Portugal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                )}
              />
              {errors.pais && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.pais.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardFooter className='py-2'>
          </CardFooter>
        </Card>

        {/* COMPANY DATA 2 */}
        <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
          <CardHeader className='pb-0'>
            <CardTitle>CEP</CardTitle>
            <CardDescription>
              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite o CEP' />
                )}
              />
              {errors.cep && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cep.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 py-4'>
            <CardTitle>Rua</CardTitle>
            <CardDescription>
              <Controller
                name="rua"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite a rua' />
                )}
              />
              {errors.rua && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.rua.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 py-0'>
            <CardTitle>Bairro</CardTitle>
            <CardDescription>
              <Controller
                name="bairro"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite o bairro' />
                )}
              />
              {errors.bairro && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.bairro.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 pt-4 pb-0 px-6'>
            <CardTitle>Número</CardTitle>
            <CardDescription>
              <Controller
                name="numero"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder='Digite o número' />
                )}
              />
              {errors.numero && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.numero.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className='py-2'>
          </CardFooter>
        </Card>

        {/* SEGMENT */}
        <Card className='w-80 my-4 mx-auto h-max flex flex-col text-left'>
          <CardHeader className='my-0 pt-6 pb-2 px-6 w-full'>
            <CardTitle>Segmento</CardTitle>
            <CardDescription>
              <Controller
                name="segmento"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Segmento</SelectLabel>
                        <SelectItem value="textil">Textil</SelectItem>
                        <SelectItem value="maqEquip">Máquinas e Equipamentos</SelectItem>
                        <SelectItem value="alimentBebi">Alimentos e Bebidas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.segmento && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.segmento.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardHeader className='my-0 pt-2 pb-2 px-6 w-full'>
            <CardTitle>Subsegmento</CardTitle>
            <CardDescription>
              <Controller
                name="subsegmento"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Subsegmento</SelectLabel>
                        <SelectItem value="subtextil">Sub Textil</SelectItem>
                        <SelectItem value="submaqEquip">Sub Máquinas e Equipamentos</SelectItem>
                        <SelectItem value="subalimentBebi">Sub Alimentos e Bebidas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subsegmento && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.subsegmento.message}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardFooter className='py-4 pb-6'>
            <Button className='w-full' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Validando...' : 'Próximo'} <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default NacionalData;
