// src/components/forms/moreContact.tsx

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

import { ClienteNacionalFormData } from '../../pages/register/clienteNacional/types'; // Importando de types.ts

interface MoreContactProps {
  onNext: (data: Partial<ClienteNacionalFormData>) => void;
}

const MoreContact: React.FC<MoreContactProps> = ({ onNext }) => {
  /**
   * Função chamada quando o usuário decide adicionar mais contatos.
   */
  const handleAddContacts = () => {
    console.log('[MoreContact] Usuário optou por adicionar mais contatos.');
    onNext({ addMoreContacts: true });
  };

  /**
   * Função chamada quando o usuário decide não adicionar mais contatos.
   */
  const handleNoMoreContacts = () => {
    console.log('[MoreContact] Usuário optou por não adicionar mais contatos.');
    onNext({ addMoreContacts: false });
  };

  return (
    <Card className='w-80 my-4 mx-auto h-max pb-2 flex flex-col text-left'>
      <CardHeader className='pb-0'>
        <CardTitle>Deseja adicionar mais contatos?</CardTitle>
        <CardDescription>
          Você pode adicionar mais contatos para sua empresa ou prosseguir com o registro.
        </CardDescription>
      </CardHeader>
      <CardFooter className='py-4 flex space-x-6 justify-betwen'>
        <Button variant='outline' onClick={handleNoMoreContacts}>
          Não
        </Button>
        <Button onClick={handleAddContacts}>
          Sim, adicionar <ArrowRight className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MoreContact;
