import React from 'react';
import BottomBar from '../../components/BottomBar';
import Identification from '../../components/Identification';
import MenuBar from '../../components/MenuBar';
import DefaultLayout from '../DefaultLayout';

import { Container } from './styles';

function Register() {
  return (
    <Container>
      <DefaultLayout />
      <MenuBar />
      <h1>Cadastro de novo cliente</h1>
      <Identification />
      <BottomBar />
    </Container>
  );
};

export default Register;
