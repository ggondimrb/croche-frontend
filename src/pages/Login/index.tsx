import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BottomBar from '../../components/BottomBar';

import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { validMail } from '../../util/format';

import { Container, Wrapper, Block, Line } from './styles';
import DefaultLayout from '../DefaultLayout';

const Login: React.FC = () => {
  const history = useHistory();
  const {signIn, getLoading} = useAuth();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newMail, setNewMail] = useState<string>('');

  const [mailValid, setMailValid] = useState<Boolean>(true);
  const [passwordValid, setPasswordValid] = useState<Boolean>(true);
  const [newMailValid, setNewMailValid] = useState<Boolean>(true);

  interface RouteParams {
    redirect: string
  }

  const params = useParams<RouteParams>();
  
  function validateFields() {
    
    setNewMailValid(true);

    if(!mail) {      
      setMailValid(false);     
      return false; 
    } else {
      if(validMail(mail)) {
        setMailValid(true);
      } else {
        setMailValid(false);
        return false;
      }      
    }

    if(!password) {
      setPasswordValid(false);
      return false;
    } else {
      setPasswordValid(true);
    }

    return true;
  }

  async function login() {    

    if (validateFields()) {   

      try {
        await signIn(mail,password);
        
        if(params.redirect === 'home') {
          history.push('/');    
          
        } else {
          history.push(`/${params.redirect}`);  
        }        
      } catch(error) {
        alert("Não logou");
      }
      
    };

  }

  async function createAccount(){

    setPasswordValid(true);
    setMailValid(true);

    if(!newMail) {
      setNewMailValid(false);
    } else {
      setNewMailValid(true);
    }
    
  }

  return (
    <Container>
      <DefaultLayout/>
      <Wrapper>
        <Block>
          <h2>Já sou Cliente</h2>
          <Input 
            value={mail} 
            onChange={(e) => setMail(e.target.value)}
            name="login" 
            label="E-mail"/>
          {!mailValid && <ErrorMessage message="Email"/>}
          <Input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            name="password" 
            label="Senha" 
            type="password"/>
          {!passwordValid && <ErrorMessage message="Senha"/>}
          <a href="www.google.com" >Esqueci a senha</a>
          <Button onClick={login}> 
            {getLoading() ? 'Carregando...' : 'Login'} 
          </Button>
        </Block>
        <Line />
        <Block>
          <h2>Criar conta</h2>
          <Input 
            value={newMail} 
            onChange={(e) => setNewMail(e.target.value)}
            name="email" 
            label="Informe seu e-mail"/>
          {!newMailValid && <ErrorMessage message="E-mail"/>}
          <Button onClick={createAccount}> 
          {getLoading() ? 'Carregando...' : 'Prosseguir'} 
          </Button>
        </Block>        
      </Wrapper>
      <BottomBar />
    </Container>
    );
};

export default Login;
