import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { ArrowRight } from "lucide-react";

export function Stakeholder() {
    return (
       
        <form className = '' >
             {/* CONTACT STAKEHOLDER */ }
            < Card className='w-80 my-4 mx-auto h-max  pb-2    flex flex-col text-left' >
                <CardHeader className='pb-0'>
                    <CardTitle>Email</CardTitle>
                    <CardDescription><Input placeholder='Digite seu email'></Input></CardDescription>
                </CardHeader>
                <CardHeader className='my-0 py-4 '>
                    <CardTitle>Nome completo</CardTitle>
                    <CardDescription><Input placeholder='Digite seu nome completo'></Input></CardDescription>
                </CardHeader>

                <CardHeader className='my-0 py-4 pt-0'>
                    <CardTitle>Nome da empresa</CardTitle>
                    <CardDescription><Input placeholder='Digite seu o nome da empresa'></Input></CardDescription>
                </CardHeader>

                <CardHeader className='my-0 py-4 pt-0'>
                    <CardTitle>CNPJ</CardTitle>
                    <CardDescription><Input placeholder='00.000.000/0000-00'></Input></CardDescription>
                </CardHeader>

                <CardHeader className='my-0 py-4   pt-0  '>
                    <CardTitle>Telefone</CardTitle>
                    <CardDescription><Input placeholder='Digite seu telefone'></Input></CardDescription>
                </CardHeader>

                <CardHeader className='my-0 py-0'>
                    <CardTitle>Setor</CardTitle>
                    <CardDescription> <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Atuação</SelectLabel>
                                <SelectItem value="simplesNacional">Comercial</SelectItem>
                                <SelectItem value="lucroPresumido">Diretoria</SelectItem>
                                <SelectItem value="lucroReal">Financeiro</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select></CardDescription>
                </CardHeader>
                <CardHeader className='my-0 pt-4 pb-0 px-6 '>
                    <CardTitle>Cargo</CardTitle>
                    <CardDescription>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Atuação</SelectLabel>
                                    <SelectItem value="brasil">Analista</SelectItem>
                                    <SelectItem value="estadosUnidos">Assistente</SelectItem>
                                    <SelectItem value="Portugal">Diretor</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </CardDescription>
                </CardHeader>
                <CardFooter className='py-4 align-center justify-between'>
                    <Button className='w-full'>Próximo<ArrowRight></ArrowRight></Button>
                </CardFooter>
            </Card >
                </form >
)
}

export default Stakeholder;