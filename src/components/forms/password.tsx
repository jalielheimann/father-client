// src/components/forms/password.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { ClienteNacionalFormData } from '../../pages/register/clienteNacional/types';
import passwordService from '@/services/passwordService';

interface PasswordIDProps {
  onNext?: (data: Partial<ClienteNacionalFormData>) => void; // Tornamos 'onNext' opcional
  email?: string; // Tornamos 'email' opcional
}

const PasswordID: React.FC<PasswordIDProps> = ({ onNext, email }) => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Limpa o erro se houver
    setErro('');

    if (onNext) {
      // Chama onNext passando a senha
      onNext({ senha });
    } else {
      // Implementar lógica alternativa, como enviar a senha para a API diretamente
      try {
        await passwordService.createPassword({
          email: email || '', // Usa o email fornecido ou uma string vazia
          senha: senha,
        });
        console.log('Senha criada com sucesso.');
        navigate('/success'); // Redireciona para a página de sucesso
      } catch (error) {
        console.error('Erro ao criar senha:', error);
        setErro('Erro ao criar senha. Por favor, tente novamente.');
      }
    }
  };

  return (
    <Card className='w-96 my-28 mx-auto h-max pb-2 flex flex-col text-left'>
      <CardHeader>
        <CardTitle>Criar Senha</CardTitle>
        <CardDescription>
          Crie uma senha para {email || 'seu email'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <label htmlFor='senha' className='block text-sm font-medium text-gray-700'>
              Senha
            </label>
            <Input
              id='senha'
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor='confirmarSenha'
              className='block text-sm font-medium text-gray-700'
            >
              Confirmar Senha
            </label>
            <Input
              id='confirmarSenha'
              type='password'
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          {erro && <p className='text-red-500 text-sm'>{erro}</p>}
        </div>
      </CardContent>
      <CardFooter className='py-4 flex justify-end'>
        <Button onClick={handleSubmit}>Concluir</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordID;
