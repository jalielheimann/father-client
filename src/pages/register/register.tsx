import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Colaborador from './colaborador/colaborador';
import Stakeholder from './stakeholder/stakeholder';
import ClienteInternacional from './clienteInternacional/clienteInternacional';
import ClienteNacional from './clienteNacional/clienteNacional';

// Esquema Zod para validação do formulário
const userTypeSchema = z.object({
    userType: z.string().nonempty('Selecione um tipo de usuário'),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: 'Você deve aceitar os termos de uso',
    })
});

type UserTypeFormData = z.infer<typeof userTypeSchema>;

const Register: React.FC = () => {
    const [selectedUserType, setSelectedUserType] = React.useState<string | null>(null);

    const { handleSubmit, control, formState: { errors } } = useForm<UserTypeFormData>({
        resolver: zodResolver(userTypeSchema),
        defaultValues: {
            userType: '',
            acceptTerms: false
        }
    });

    const onSubmit = (data: UserTypeFormData) => {
        setSelectedUserType(data.userType);
    };

    return (
        <div className='bg-slate-100 w-dvh  min-h-dvh flex flex-col'>
            <div className='mx-auto w-fit m-auto flex flex-col items-stretch justify-center text-center'>
                {/* Formulário Inicial */}
                {!selectedUserType && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* TIPO DE USUARIO */}
                        <Card className='w-80 mx-auto my-4 h-38 flex flex-col text-left'>
                            <CardHeader className='pb-0'>
                                <CardTitle>Selecione seu tipo</CardTitle>
                                <CardDescription>
                                    <Controller
                                        name="userType"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Tipo</SelectLabel>
                                                        <SelectItem value="clienteNacional">Cliente Nacional</SelectItem>
                                                        <SelectItem value="clienteInternacional">Cliente Internacional</SelectItem>
                                                        <SelectItem value="stakeholder">Stakeholder</SelectItem>
                                                        <SelectItem value="colaborador">Colaborador</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.userType && <span className="text-red-500">{errors.userType.message}</span>}
                                </CardDescription>
                                <CardFooter className='py-4 px-0 w-full flex items-left space-x-2'>
                                    <Controller
                                        name="acceptTerms"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="acceptTerms"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                                <Label className="text-xs" htmlFor="acceptTerms">Eu li e concordo com os termos de uso</Label>
                                            </div>
                                        )}
                                    />
                                </CardFooter>
                                {errors.acceptTerms && <span className="text-red-500">{errors.acceptTerms.message}</span>}
                            </CardHeader>
                            <CardFooter>
                                <Button className='w-full' type="submit">Próximo <ArrowRight /></Button>
                            </CardFooter>
                        </Card>
                    </form>
                )}
               
                {/* Renderização Condicional dos Componentes */}
                {selectedUserType === 'colaborador' && <Colaborador />}
                {selectedUserType === 'stakeholder' && <Stakeholder />}
                {selectedUserType === 'clienteInternacional' && <ClienteInternacional />}
                {selectedUserType === 'clienteNacional' && <ClienteNacional />}
            </div>
        </div>
    );
};

export default Register;
