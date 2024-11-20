import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar as CalendarIcon, PlusCircle, XIcon } from "lucide-react";
import { useState } from 'react';
import employeeService from '../../../services/employeeService'; // Importe o serviço

// Definição do esquema Zod para um único colaborador
const colaboradorSchema = z.object({
    email: z.string()
        .nonempty('O email é obrigatório')
        .email('Formato de email inválido'),
    name: z.string()
        .nonempty('O nome é obrigatório'),
    telefone: z.string()
        .nonempty('O telefone é obrigatório')
        .regex(/^\+?[1-9]\d{1,14}$/, 'Formato de telefone inválido'),
    setor: z.string()
        .nonempty('O setor é obrigatório'),
    cargo: z.string()
        .nonempty('O cargo é obrigatório'),
    dataAniversario: z.date().nullable().refine((val) => val !== null, {
        message: 'A data de aniversário é obrigatória',
    })
});

// Definição do esquema Zod para o formulário inteiro (array de colaboradores)
const registerColaboradorFromSchema = z.object({
    colaboradores: z.array(colaboradorSchema).min(1, 'Pelo menos um colaborador é necessário')
});

type RegisterColaboradorFormData = z.infer<typeof registerColaboradorFromSchema>;

export function Colaborador() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<RegisterColaboradorFormData>({
        resolver: zodResolver(registerColaboradorFromSchema),
        defaultValues: {
            colaboradores: [
                {
                    email: '',
                    name: '',
                    telefone: '',
                    setor: '',
                    cargo: '',
                    dataAniversario: null // Use null em vez de undefined
                }
            ]
        }
    });

    // Utilização do useFieldArray para gerenciar a lista de colaboradores
    const { fields, append, remove } = useFieldArray({
        control,
        name: "colaboradores"
    });

    // Estados para carregamento e mensagens de erro
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: RegisterColaboradorFormData) => {
        console.log(data);
        setIsLoading(true);
        setErrorMessage(null);
        try {
            // Valida cada email dos colaboradores
            for (const colaborador of data.colaboradores) {
                const exists = await employeeService.validateEmployeeEmail(colaborador.email);
                if (exists) {
                    setErrorMessage(`O email ${colaborador.email} já está registrado.`);
                    setIsLoading(false);
                    return;
                }
            }

            // Se todos os emails forem válidos, envia os dados para a API
            const response = await employeeService.sendEmployeeInfo(data.colaboradores);
            console.log('Resposta da API:', response);
            alert('Colaboradores cadastrados com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar dados dos colaboradores:', error);
            setErrorMessage('Ocorreu um erro ao cadastrar os colaboradores. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    // Função para adicionar um novo colaborador
    const handleAddColaborador = () => {
        append({
            email: '',
            name: '',
            telefone: '',
            setor: '',
            cargo: '',
            dataAniversario: null // Use null em vez de undefined
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <Card key={field.id} className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left relative'>
                    {/* Botão para remover o colaborador, exceto para o primeiro */}
                    {fields.length > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            className="absolute top-2 right-2 h-2 w-2 p-4 border-none shadow-none"
                            onClick={() => remove(index)}
                        >
                            <XIcon size={8} />
                        </Button>
                    )}

                    {/* Email */}
                    <CardHeader className='pb-0'>
                        <CardTitle>Email</CardTitle>
                        <CardDescription>
                            <Input
                                placeholder='Digite seu email'
                                {...register(`colaboradores.${index}.email` as const)}
                            />
                            {errors.colaboradores?.[index]?.email && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].email?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Nome Completo */}
                    <CardHeader className='my-0 py-4'>
                        <CardTitle>Nome completo</CardTitle>
                        <CardDescription>
                            <Input
                                placeholder='Digite seu nome completo'
                                {...register(`colaboradores.${index}.name` as const)}
                            />
                            {errors.colaboradores?.[index]?.name && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].name?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Telefone */}
                    <CardHeader className='my-0 py-4 pt-0'>
                        <CardTitle>Telefone</CardTitle>
                        <CardDescription>
                            <Input
                                placeholder='Digite seu telefone'
                                {...register(`colaboradores.${index}.telefone` as const)}
                            />
                            {errors.colaboradores?.[index]?.telefone && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].telefone?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Setor */}
                    <CardHeader className='my-0 py-0'>
                        <CardTitle>Setor</CardTitle>
                        <CardDescription>
                            <Controller
                                control={control}
                                name={`colaboradores.${index}.setor` as const}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Atuação</SelectLabel>
                                                <SelectItem value="Comercial">Comercial</SelectItem>
                                                <SelectItem value="Diretoria">Diretoria</SelectItem>
                                                <SelectItem value="Financeiro">Financeiro</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.colaboradores?.[index]?.setor && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].setor?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Cargo */}
                    <CardHeader className='my-0 pt-4 pb-0 px-6'>
                        <CardTitle>Cargo</CardTitle>
                        <CardDescription>
                            <Controller
                                control={control}
                                name={`colaboradores.${index}.cargo` as const}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ''}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Atuação</SelectLabel>
                                                <SelectItem value="Analista">Analista</SelectItem>
                                                <SelectItem value="Assistente">Assistente</SelectItem>
                                                <SelectItem value="Diretor">Diretor</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.colaboradores?.[index]?.cargo && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].cargo?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Data de Aniversário */}
                    <CardHeader className='my-0 py-0 pt-4 pb-2'>
                        <CardTitle>Data de aniversário</CardTitle>
                        <CardDescription>
                            <Controller
                                control={control}
                                name={`colaboradores.${index}.dataAniversario` as const}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal rounded-md",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => field.onChange(date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.colaboradores?.[index]?.dataAniversario && (
                                <span className="text-orange-400">
                                    {errors.colaboradores[index].dataAniversario?.message}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>

                    {/* Rodapé do Card */}
                    <CardFooter className='py-4 align-center justify-between'>
                        {/* Botão de Adicionar aparece somente no último Card */}
                        {index === fields.length - 1 && (
                            <Button
                                type="button"
                                variant='secondary'
                                className='w-28'
                                onClick={handleAddColaborador}
                            >
                                Adicionar <PlusCircle />
                            </Button>
                        )}
                        {/* Botão de Submissão aparece somente no último Card */}
                        {index === fields.length - 1 && (
                            <Button className='w-26' type="submit" disabled={isLoading}>
                                {isLoading ? 'Enviando...' : 'Próximo'} <ArrowRight />
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}

            {/* Mensagem de erro para a lista de colaboradores */}
            {errors.colaboradores && typeof errors.colaboradores.message === 'string' && (
                <span className="text-orange-400 text-center block">
                    {errors.colaboradores.message}
                </span>
            )}

            {/* Exibir mensagem de erro personalizada */}
            {errorMessage && (
                <span className="text-red-500 text-center block">
                    {errorMessage}
                </span>
            )}

            {/* Exibir um indicador de carregamento */}
            {isLoading && (
                <div className="text-center mt-4">
                    <span>Enviando dados...</span>
                </div>
            )}
        </form>
    );
}

export default Colaborador;
