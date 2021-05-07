import React from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';

import ErrorMessage from '../../components/ErrorMessage';
import { MdPerson } from "react-icons/md";
import InputMask from 'react-input-mask';
import Button from '../../components/Button';
import { Container, Form } from './styles';

interface FormValues {
  name: string;
  mail: string;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
};

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

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <MdPerson size={36} color="#FFF" />
          <h1>Identificação</h1>
        </header>
        <input 
          name="mail" 
          ref={register} 
          placeholder="E-mail"             
        />
        <input 
          name="name" 
          ref={register} 
          placeholder="Nome Completo"             
        />
        {errors?.name && <ErrorMessage message={errors.name.message} />}
        <input 
          name="phone" 
          ref={register} 
          placeholder="Telefone"             
        />
        <InputMask  name="cpf"                                                      
                    mask="999.999.999-99"     
                    ref={register}      
                    placeholder="CPF"                                      
        />                   
        <input 
          name="password" 
          ref={register} 
          placeholder="Senha"             
        />              
        <input 
          name="confirmPassword" 
          ref={register} 
          placeholder="Confirmar Senha"             
        />              
        <Button type="submit">
          Próximo 
        </Button>
      </Form>
    </Container>
  );
};

export default Identification;
