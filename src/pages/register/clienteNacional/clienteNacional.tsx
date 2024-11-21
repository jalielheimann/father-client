// src/pages/register/clienteNacional/index.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos o useNavigate do react-router-dom
import CnpjInfo from './components/cnpjInfo';
import EmailInfo from '@/components/forms/emailInfo';
import ContactData from '@/components/forms/contactData';
import ContactDataPlus from '@/components/forms/contactDataPlus';
import MoreContact from '@/components/forms/moreContact';
import NacionalData from './components/nacionalData';
import FatherID from '@/components/forms/fatherID';
import PasswordID from '@/components/forms/password'; // Certifique-se de que o caminho está correto
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Step, ClienteNacionalFormData } from './types'; // Importando do types.ts
import companyService from '@/services/companyService';
import contactService from '@/services/contactService';
import passwordService from '@/services/passwordService';

/**
 * Componente principal para o registro de cliente nacional.
 * Gerencia as etapas do processo de registro, começando pelo CnpjInfo.
 */
const ClienteNacional: React.FC = () => {
  const navigate = useNavigate(); // Inicializamos o navigate
  // Estado para rastrear a etapa atual do formulário.
  const [currentStep, setCurrentStep] = useState<Step>(Step.CnpjInfo);

  // Estado para armazenar os dados do formulário.
  const [formData, setFormData] = useState<ClienteNacionalFormData>({
    contatos: [],
  });

  /**
   * Estado para gerenciar mensagens de sucesso ou erro.
   */
  const [mensagem, setMensagem] = useState<string | null>(null);

  /**
   * Função para enviar os dados para a API.
   */
  const enviarDados = async (dados: ClienteNacionalFormData) => {
    try {
      console.log('[enviarDados] Dados recebidos:', dados);

      // Preparação do companyInfo
      const companyInfo = {
        country: dados.pais || '',
        companyName: dados.razaoSocial || '',
        socialNameCompany: dados.nomeEmpresa || '',
        companyID: dados.cnpj ? dados.cnpj.replace(/[^\d]+/g, '') : '',
        typeID: 'CNPJ',
        socialClass: dados.classificacaoFiscal || '',
        Segment: dados.segmento || '',
        SubSegment: dados.subsegmento ? [dados.subsegmento] : [],
        website: '', // Não coletado, definir conforme necessário
        State: '', // Não coletado, definir conforme necessário
        City: '', // Não coletado, definir conforme necessário
        Address:
          dados.rua && dados.bairro && dados.cep && dados.numero
            ? `${dados.rua}, ${dados.numero} - ${dados.bairro}, CEP ${dados.cep}`
            : '',
        type: 'nacional',
      };

      console.log('[enviarDados] companyInfo construído:', companyInfo);

      // Enviar companyInfo
      await companyService.sendCompanyInfo(companyInfo);

      // Enviar cada contato
      const cleanedCompanyID = dados.cnpj ? dados.cnpj.replace(/[^\d]+/g, '') : '';

      for (const contato of dados.contatos) {
        const contactInfo = {
          name: contato.nomeCompleto,
          email: contato.email || '',
          phone: contato.telefone,
          role: contato.cargo,
          sector: contato.setor,
          companyID: cleanedCompanyID,
        };

        console.log('[enviarDados] Enviando contactInfo:', contactInfo);

        await contactService.sendContactInfo(contactInfo);
      }

      console.log('Dados enviados com sucesso.');
      setMensagem('Registro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setMensagem('Erro ao realizar o registro. Por favor, tente novamente.');
    }
  };

  /**
   * Função chamada quando uma etapa chama onNext.
   * @param data Dados coletados pela etapa atual.
   */
  const handleNext = async (data: Partial<ClienteNacionalFormData>) => {
    console.log(`[ClienteNacional] handleNext chamado na etapa: ${currentStep} com os dados:`, data);

    // Calcula os dados atualizados
    const updatedFormData: ClienteNacionalFormData = {
      ...formData,
      ...data,
      contatos: data.contatos ? [...formData.contatos, ...data.contatos] : formData.contatos,
    };

    console.log('[ClienteNacional] Dados atualizados para enviar:', updatedFormData);

    // Atualiza o estado com os dados atualizados
    setFormData(updatedFormData);

    // Decisão de qual será a próxima etapa com base na etapa atual e nos dados coletados.
    switch (currentStep) {
      case Step.CnpjInfo:
        if (data.cnpjExists !== undefined) {
          if (data.cnpjExists) {
            console.log('[ClienteNacional] CNPJ existe. Indo para EmailInfo.');
            setCurrentStep(Step.EmailInfo);
          } else {
            console.log('[ClienteNacional] CNPJ não existe. Indo para NacionalData.');
            setCurrentStep(Step.NacionalData);
          }
        }
        break;

      case Step.NacionalData:
        console.log('[ClienteNacional] Dados nacionais coletados. Indo para EmailInfo.');
        setCurrentStep(Step.EmailInfo);
        break;

      case Step.EmailInfo:
        if (data.emailExists !== undefined) {
          if (data.emailExists) {
            console.log('[ClienteNacional] Email existe. Indo para MoreContact.');
            setCurrentStep(Step.MoreContact);
          } else {
            console.log('[ClienteNacional] Email não existe. Indo para ContactData.');
            setCurrentStep(Step.ContactData);
          }
        }
        break;

      case Step.ContactData:
        console.log('[ClienteNacional] Dados de contato coletados. Indo para MoreContact.');
        setCurrentStep(Step.MoreContact);
        break;

      case Step.ContactDataPlus:
        console.log('[ClienteNacional] Dados de contato adicional coletados. Indo para MoreContact.');
        setCurrentStep(Step.MoreContact);
        break;

      case Step.MoreContact:
        console.log('[ClienteNacional] Decisão sobre adicionar mais contatos:', data.addMoreContacts);
        if (data.addMoreContacts) {
          console.log('[ClienteNacional] Adicionando mais contatos via ContactDataPlus.');
          setCurrentStep(Step.ContactDataPlus);
        } else {
          console.log('[ClienteNacional] Redirecionando para FatherID.');
          setCurrentStep(Step.FatherID);
        }
        break;

      case Step.FatherID:
        console.log('[ClienteNacional] Dados de FatherID coletados. Fluxo concluído.');
        console.log('[ClienteNacional] Enviando dados da empresa e contatos...');
        await enviarDados(updatedFormData);
        console.log('[ClienteNacional] Fluxo de registro concluído.');

        if (data.desejaCriarFatherID) {
          console.log('[ClienteNacional] Redirecionando para PasswordID.');
          setCurrentStep(Step.PasswordID);
        } else {
          setMensagem('Registro realizado com sucesso!');
          navigate('/success');
        }
        break;

      case Step.PasswordID:
        console.log('[ClienteNacional] Senha recebida. Enviando para o passwordService...');
        // Chamamos o passwordService com a senha e o email
        await passwordService.createPassword({
          email: formData.email || '',
          senha: data.senha || '',
        });
        console.log('[ClienteNacional] Senha criada com sucesso.');
        setMensagem('Conta criada com sucesso!');
        navigate('/success');
        break;

      default:
        console.warn(`[ClienteNacional] Etapa desconhecida: ${currentStep}`);
        setCurrentStep(Step.CnpjInfo);
        break;
    }
  };

  /**
   * Função para voltar para a etapa anterior no fluxo.
   */
  const handleBack = () => {
    console.log('[ClienteNacional] handleBack chamado. Etapa atual:', currentStep);
    switch (currentStep) {
      case Step.EmailInfo:
        setCurrentStep(Step.CnpjInfo);
        break;
      case Step.ContactData:
        if (formData.cnpjExists) {
          setCurrentStep(Step.EmailInfo);
        } else {
          setCurrentStep(Step.NacionalData);
        }
        break;
      case Step.ContactDataPlus:
        setCurrentStep(Step.MoreContact);
        break;
      case Step.MoreContact:
        if (formData.contatos.length > 0) {
          const lastContact = formData.contatos[formData.contatos.length - 1];
          if (lastContact.email) {
            setCurrentStep(Step.ContactDataPlus);
          } else {
            setCurrentStep(Step.ContactData);
          }
        } else {
          setCurrentStep(Step.EmailInfo);
        }
        break;
      case Step.FatherID:
        setCurrentStep(Step.MoreContact);
        break;
      case Step.PasswordID:
        setCurrentStep(Step.FatherID);
        break;
      default:
        console.warn(`[ClienteNacional] Não há etapas anteriores para voltar a partir de: ${currentStep}`);
        break;
    }
  };

  console.log('[ClienteNacional] Renderização do componente. Etapa atual:', currentStep);
  console.log('[ClienteNacional] Dados coletados até agora:', formData);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <section className='w-full max-w-lg'>
        {/* Renderização condicional das etapas */}
        {currentStep === Step.CnpjInfo && <CnpjInfo onNext={handleNext} />}
        {currentStep === Step.NacionalData && <NacionalData onNext={handleNext} />}
        {currentStep === Step.EmailInfo && <EmailInfo onNext={handleNext} />}
        {currentStep === Step.ContactData && (
          <ContactData onNext={handleNext} email={formData.email || ''} />
        )}
        {currentStep === Step.ContactDataPlus && <ContactDataPlus onNext={handleNext} />}
        {currentStep === Step.MoreContact && <MoreContact onNext={handleNext} />}
        {currentStep === Step.FatherID && (
          <FatherID onNext={handleNext} email={formData.email || ''} />
        )}
      {currentStep === Step.PasswordID && (
  <PasswordID onNext={handleNext} email={formData.email || ''} />
)}


      </section>

      {/* Mensagem de Sucesso ou Erro */}
      {mensagem && (
        <div
          className={`mt-4 p-4 rounded ${
            mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {mensagem}
        </div>
      )}

      {/* Botão de Voltar, se não estiver na primeira etapa */}
      {currentStep !== Step.CnpjInfo && (
        <Button
          onClick={handleBack}
          variant='outline'
          className='mt-4 flex items-center justify-center'
        >
          <ArrowLeft className='mr-2' /> Voltar
        </Button>
      )}
    </div>
  );
};

export default ClienteNacional;
