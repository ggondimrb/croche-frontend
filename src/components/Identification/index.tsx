import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorMessage from '../../components/ErrorMessage';
import { MdPerson } from "react-icons/md";
import InputMask from 'react-input-mask';
import { Container, Form, ButtonConfirm } from './styles';
import apiCep from '../../services/apiCep';
import { InputFret } from '../../pages/Cart/styles';
import Input from '../../components/Input';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

interface FormValues {
  name: string;
  mail: string;
  phone: string;
  password: string;
  confirmPassword: string;
  adress: string;
  num: number;
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
  erro: string;
}

const initialState = {
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
  erro: ""
}

type ResponseAdress = {
  data: Adress;
}

type ResponseCreate = {
  data: Data;
}

type Data = {
  status: number;
  errors: Error[];
}

type Error = {
  fieldName: string;
  message: string;
}


const Identification: React.FC = () => {
  const { signIn } = useAuth();
  const { register, handleSubmit, errors } = useForm<FormValues>();
  const history = useHistory();
  

  const onSubmit = handleSubmit((data) => {
    
    if(validateCpfAndCep()){
      create(data);
    }

  });

  async function create(data: FormValues) {
    const {name, phone, mail, password, confirmPassword, num, complement} = data;
    const {logradouro, bairro, localidade, uf} = adress;
    const cpfFormat = cpf.replace('.','').replace('.','').replace('-','');
    const cepFormat = cep.replace('-','');

    try {
      const response: ResponseCreate = await api.post('/clientes',{
        name, phone, mail, password, confirmPassword, num, complement,
        logradouro, bairro, localidade, uf, cep: cepFormat, cpf: cpfFormat,
        type: 1
      })

      if(response) {
        toast.success("Cliente adicionado com sucesso!");
        await signIn(mail,password);
        history.push("/");
        
      }

    } catch (e) {
      
      if(e.response.data.errors) {
        const responseErrors : Error[] = e.response.data.errors;    

        responseErrors.forEach((erro: Error) => 
           toast.error(erro.message)
        )
      }
    }
  }

  function validateCpfAndCep() {
    
    if(!cpf) {
      setCpfValid(false);
      return false;
    } else {
      setCpfValid(true);
    }

    if(!validateCep(cep)) {
      setCepValid(false);
      return false;
    } else {
      setCepValid(true);
    }

    return true;
  }

  function validateCep(cep: string) {
    return (cep && cep.length === 9 && cep.replace(/[^0-9]/g,"").length === 8);
  }

  const [cep, setCep] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');

  const [cepValid, setCepValid] = useState<Boolean>(true);
  const [cpfValid, setCpfValid] = useState<Boolean>(true);  
  
  const [adress, setAdress] = useState<Adress>({} as Adress);

  async function findAdress() {
    console.log(cep);
    if(validateCep(cep)) {

      const response : ResponseAdress = await apiCep.get(`${cep}/json/`);

      if(response.data.erro) {        
        setAdress(initialState);
      } else {
        setAdress(response.data);        
      } 
    } else {
      setAdress(initialState);
    }  
    
  }

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <header>
          <MdPerson size={36} color="#FFF" />
          <h2>Identificação</h2>
        </header>
        <label>Nome Completo</label>
        <input 
          id="name"
          name="name" 
          type="text"
          ref={register({ required: true })}
        />
        {errors.name && <ErrorMessage message="Nome" />}
        <label>CPF</label>
        <InputMask  
          name="cpf"                                                      
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="999.999.999-99"             
        />          
        {!cpfValid && <ErrorMessage message="CPF"/>}
        <label>Celular</label>
        <input 
          name="phone" 
          type="text"
          ref={register({ required: true })}
        />        
        {errors.phone && <ErrorMessage message="Celular" />}
        <label>E-mail</label>
        <input 
          name="mail" 
          ref={register({ required: true })}
        />
        {errors.mail && <ErrorMessage message="E-mail" />}
        <label>Senha</label>
        <input 
          name="password" 
          ref={register({ required: true })}
          type="password"
        />
        {errors.password && <ErrorMessage message="Senha" />}              
        <label>Confirmar Senha</label>
        <input 
          name="confirmPassword" 
          ref={register({ required: true })}
          type="password"           
        />            
        {errors.confirmPassword && <ErrorMessage message="Confirmar Senha" />}                
        <h2>Dados de Entrega</h2>
        <label>CEP</label>
        <InputFret id="cep"                                                      
                    mask="99999-999"                                                 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={(e) => findAdress()} />
        {!cepValid && <ErrorMessage message="CEP"/>}
        <label>Endereço</label>                      
        <Input 
          name="adress"
          label=""
          value={adress.logradouro}
          disabled />
        <label>Número</label>                      
        <input 
          name="num"
          type="number"
          min="1"
          ref={register({ required: true })}
        />
        {errors.num && <ErrorMessage message="Número" />}
        <label>Complemento</label>                      
        <input 
          name="complement"
          type="text"
          maxLength={100}
          ref={register({ required: true })}
        />
        {errors.complement && <ErrorMessage message="Complemento" />}
        <label>Bairro</label>                      
        <input 
          name="district"
          value={adress.bairro}
          disabled 
        />
        <label>Cidade</label>                      
        <input 
          name="city"
          value={adress.localidade}
          disabled 
        />
        <label>UF</label>                                    
        <input 
          name="uf"
          value={adress.uf}
          disabled 
        />
        <ButtonConfirm type="submit">
          Avançar 
        </ButtonConfirm>
      </Form>
    </Container>
  );
};

export default Identification;
