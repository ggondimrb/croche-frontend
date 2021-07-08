import React from 'react';

import DefaultLayout from '../DefaultLayout';

import { Container, Wrapper, Right } from './styles';
import BottomBar from '../../components/BottomBar';
import MyOrders from '../../components/MyOrders';
import ProfileSideBar from '../../components/ProfileSideBar';
import { useMenu } from '../../contexts/menu';
import MyData from '../../components/MyData';

export default function Profile() {
  const {showOrders, showPersonalData} = useMenu();

  return (
    <Container>
      <DefaultLayout />
      <Wrapper>
        <ProfileSideBar />
        <Right>
          {showOrders && <MyOrders />}
          {showPersonalData && <MyData />}
        </Right>
      </Wrapper>
      <BottomBar />
    </Container>
  )};
