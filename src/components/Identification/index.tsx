import React, { useState } from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';

import ErrorMessage from '../../components/ErrorMessage';
import { MdPerson } from "react-icons/md";
import InputMask from 'react-input-mask';
import { Container, Form, ButtonConfirm } from './styles';
import apiCep from '../../services/apiCep';
import { InputFret } from '../../pages/Cart/styles';
import Input from '../../components/Input';

interface FormValues {
  name: string;
  mail: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  cep: string;
  adress: string;
  number: number;
  complement: string;  
  district: string;
  city: string;
  state: string;  
  country: string;
};

interface Adress {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: number;
  complemento: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: 'required',
            message: 'Nome Completo',
          },
        }
      : {},
  };
};

const Identification: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({resolver});
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  const [cep, setCep] = useState<string>('');
  const [adress, setAdress] = useState<Adress>({} as Adress);

  async function findAdress() {
    const response = await apiCep.get(`${cep}/json/`);    
    setAdress(response.data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <MdPerson size={36} color="#FFF" />
          <h2>Identificação</h2>
        </header>
        <label>Nome Completo</label>
        <input 
          name="name" 
          ref={register} 
        />
        {errors?.name && <ErrorMessage message={errors.name.message} />}
        <label>CPF</label>
        <InputMask  
          name="cpf"                                                      
          mask="999.999.999-99"
          ref={register}      
          placeholder="999.999.999-99"                                      
        />                
        <label>Celular</label>
        <input 
          name="phone" 
          ref={register} 
        />        
        <label>E-mail</label>
        <input 
          name="mail" 
          ref={register}             
        />
        <label>Senha</label>
        <input 
          name="password" 
          ref={register} 
          type="password"
        />              
        <label>Confirmar Senha</label>
        <input 
          name="confirmPassword" 
          ref={register} 
          type="password"           
        />              
        <h2>Dados de Entrega</h2>
        <div>
          <h4>CEP</h4>
          <InputFret id="fret"                                                      
                      mask="99999-999"                                                 
                      value={cep} 
                      onChange={(e) => setCep(e.target.value)}
                      onBlur={(e) => findAdress()} />
          <div>
            <label>Endereço</label>                      
            <Input 
              name="adress"
              label=""
              value={adress.logradouro}
              disabled />
          </div>
          <div>
            <label>Número</label>                      
            <Input 
              name="num"
              label=""
              value={adress.numero}/>
          </div>
          <div>
            <label>Complemento</label>                      
            <Input 
              name="complement"
              label=""
              value={adress.complemento}/>
          </div>   
          <div>
            <label>Bairro</label>                      
            <Input 
              name="district"
              label=""
              value={adress.bairro}
              disabled />
          </div>
          <div>
            <label>Cidade</label>                      
            <Input 
              name="city"
              label=""
              value={adress.localidade}
              disabled />
          </div>
          <div>
            <label>UF</label>                                    
            <Input 
              name="uf"
              label=""
              value={adress.uf}
              disabled />                                                                                
          </div>                                                                                
        </div>
        <ButtonConfirm type="submit">
          Avançar 
        </ButtonConfirm>
      </Form>
    </Container>
  );
};

export default Identification;
