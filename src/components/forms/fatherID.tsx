// src/components/forms/FatherID.tsx

import React from 'react';
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ArrowRight, CheckIcon } from "lucide-react";
import { ClienteNacionalFormData } from '../../pages/register/clienteNacional/types';

interface FatherIDProps {
  onNext: (data: Partial<ClienteNacionalFormData>) => void;
  email: string; // Adicionamos o email aos props
}

const FatherID: React.FC<FatherIDProps> = ({ onNext, email }) => {
  const handleCreate = () => {
    onNext({ desejaCriarFatherID: true });
  };

  const handleConclude = () => {
    onNext({ desejaCriarFatherID: false });
  };

  return (
    <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
      <CardHeader>
        <CardTitle>Deseja criar sua conta FatherID?</CardTitle>
        <CardDescription>Sistema Father - para {email}</CardDescription> {/* Substituímos @email pelo email real */}
      </CardHeader>
      <CardFooter className='py-4 flex space-x-6 justify-end'>
        <Button onClick={handleConclude}>
          Concluir <CheckIcon className="ml-2" />
        </Button>
        <Button variant='outline' onClick={handleCreate}>
          Criar <ArrowRight className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FatherID;
