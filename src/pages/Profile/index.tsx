import React from 'react';

import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, MyAdress, Right } from './styles';
import BottomBar from '../../components/BottomBar';
import MyOrders from '../../components/MyOrders';
import ProfileSideBar from '../../components/ProfileSideBar';
import { useMenu } from '../../contexts/menu';

export default function Profile() {
  const {showOrders, showAdress, showPersonalData} = useMenu();

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <ProfileSideBar />
        <Right>
          {showOrders && <MyOrders />}
          {showAdress && <MyAdress><h1>Meus Endereços</h1></MyAdress>}
          {showPersonalData && <MyAdress><h1>Seus Dados</h1></MyAdress>}
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  )};
