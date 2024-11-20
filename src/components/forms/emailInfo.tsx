// src/components/forms/emailInfo.tsx

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import contactService from '@/services/contactService'; // Ajuste o caminho conforme necessário


// Definição do esquema Zod para Email
const emailSchema = z.object({
    email: z.string()
        .nonempty('O email é obrigatório')
        .email('Formato de email inválido'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailInfoProps {
    onNext: (data: Partial<import('@/pages/register/clienteNacional/types').ClienteNacionalFormData>) => void;
}

const EmailInfo: React.FC<EmailInfoProps> = ({ onNext }) => {
    const { control, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: EmailFormData) => {
        try {
            console.log(`Enviando Email para validação: ${data.email}`);
            const emailExists = await contactService.validateEmail(data.email);
            console.log(`Email existe: ${emailExists}`);
            onNext({ email: data.email, emailExists });
        } catch (error) {
            setError('email', { type: 'manual', message: 'Erro ao validar o email. Tente novamente.' });
            console.error('Erro ao validar Email:', error);
        }
    };

    return (
        <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* INPUT Email */}
                <CardHeader className='pb-0'>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input 
                                    {...field}
                                    placeholder='Digite seu email' 
                                    type="email"
                                    autoComplete="off"
                                />
                            )}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardFooter className='py-4'>
                    <Button 
                        className='w-full' 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Validando...' : 'Próximo'} <ArrowRight />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default EmailInfo;
